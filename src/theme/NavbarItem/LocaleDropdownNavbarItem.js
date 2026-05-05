import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import {translate} from '@docusaurus/Translate';
import {mergeSearchStrings, useHistorySelector} from '@docusaurus/theme-common';
import {applyTrailingSlash} from '@docusaurus/utils-common';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import IconLanguage from '@theme/Icon/Language';

function ensureLeadingSlash(value) {
  if (!value) return '/';
  return value.startsWith('/') ? value : `/${value}`;
}

function ensureTrailingSlash(value) {
  if (!value) return '/';
  return value.endsWith('/') ? value : `${value}/`;
}

function joinBaseUrl(baseUrl, relativePath) {
  const normalizedBaseUrl = ensureTrailingSlash(ensureLeadingSlash(baseUrl));
  const rel = (relativePath ?? '').replace(/^\//, '');
  return `${normalizedBaseUrl}${rel}`;
}

function splitSegments(pathRelativeToBase) {
  return (pathRelativeToBase ?? '')
    .split('/')
    .filter((segment) => segment.length > 0);
}

function removeLocalePrefix(segments, locales, defaultLocale) {
  const localePrefixes = new Set((locales ?? []).filter((l) => l && l !== defaultLocale));
  const result = [...(segments ?? [])];

  // Remove one or more locale prefixes to guard against accidental stacking
  while (result.length > 0 && localePrefixes.has(result[0])) {
    result.shift();
  }

  return result;
}

function stripBaseUrlRobust(pathname, baseUrl) {
  const normalizedPathname = ensureLeadingSlash(pathname);
  const normalizedBaseUrl = ensureTrailingSlash(ensureLeadingSlash(baseUrl));

  if (normalizedBaseUrl === '/') {
    return normalizedPathname.replace(/^\//, '');
  }

  if (normalizedPathname.startsWith(normalizedBaseUrl)) {
    return normalizedPathname.slice(normalizedBaseUrl.length);
  }

  // Handle the edge case where current pathname lacks the trailing slash while
  // baseUrl has it (e.g. pathname=/base/tr and baseUrl=/base/tr/)
  const baseUrlNoTrailing = normalizedBaseUrl.replace(/\/$/, '');
  if (normalizedPathname === baseUrlNoTrailing) {
    return '';
  }
  if (normalizedPathname.startsWith(`${baseUrlNoTrailing}/`)) {
    return normalizedPathname.slice(baseUrlNoTrailing.length + 1);
  }

  return normalizedPathname.replace(/^\//, '');
}

function useLocaleDropdownUtils() {
  const {
    siteConfig,
    i18n: {localeConfigs, locales, defaultLocale},
  } = useDocusaurusContext();
  const location = useLocation();
  const search = useHistorySelector((history) => history.location.search);
  const hash = useHistorySelector((history) => history.location.hash);

  const getLocaleConfig = (locale) => {
    const localeConfig = localeConfigs[locale];
    if (!localeConfig) {
      throw new Error(
        `Docusaurus bug, no locale config found for locale=${locale}`,
      );
    }
    return localeConfig;
  };

  const getBaseURLForLocale = (locale) => {
    const localeConfig = getLocaleConfig(locale);
    const isSameDomain = localeConfig.url === siteConfig.url;

    const canonicalPathname = applyTrailingSlash(location.pathname, {
      trailingSlash: siteConfig.trailingSlash,
      baseUrl: siteConfig.baseUrl,
    });

    // Path relative to the current locale baseUrl
    const pathnameSuffix = stripBaseUrlRobust(canonicalPathname, siteConfig.baseUrl);
    const suffixSegments = splitSegments(pathnameSuffix);
    const cleanedSuffixSegments = removeLocalePrefix(
      suffixSegments,
      locales,
      defaultLocale,
    );
    const cleanedSuffix = cleanedSuffixSegments.join('/');
    const targetPathname = joinBaseUrl(localeConfig.baseUrl, cleanedSuffix);

    if (isSameDomain) {
      return `pathname://${targetPathname}`;
    }

    return `${localeConfig.url}${targetPathname}`;
  };

  return {
    getURL: (locale, options) => {
      const finalSearch = mergeSearchStrings(
        [search, options?.queryString],
        'append',
      );
      return `${getBaseURLForLocale(locale)}${finalSearch}${hash}`;
    },
    getLabel: (locale) => {
      return getLocaleConfig(locale).label;
    },
    getLang: (locale) => {
      return getLocaleConfig(locale).htmlLang;
    },
  };
}

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore = [],
  dropdownItemsAfter = [],
  queryString,
  ...props
}) {
  const utils = useLocaleDropdownUtils();

  const {
    i18n: {currentLocale, locales},
  } = useDocusaurusContext();

  const localeItems = locales.map((locale) => {
    return {
      label: utils.getLabel(locale),
      lang: utils.getLang(locale),
      to: utils.getURL(locale, {queryString}),
      target: '_self',
      autoAddBaseUrl: false,
      className:
        locale === currentLocale
          ? mobile
            ? 'menu__link--active'
            : 'dropdown__link--active'
          : '',
    };
  });

  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];

  const dropdownLabel = mobile
    ? translate({
        message: 'Languages',
        id: 'theme.navbar.mobileLanguageDropdown.label',
        description: 'The label for the mobile language switcher dropdown',
      })
    : utils.getLabel(currentLocale);

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={
        <>
          <IconLanguage />
          {dropdownLabel}
        </>
      }
      items={items}
    />
  );
}
