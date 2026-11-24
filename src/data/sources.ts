export const sources = {
  'deadlock-wiki': {
    label: 'deadlock.wiki',
    url: 'https://deadlock.wiki/Console_commands',
    revision: 'oldid=236265',
    revisionUrl: 'https://deadlock.wiki/index.php?title=Console_commands&oldid=236265',
  },
  'valve-dev-wiki': {
    label: 'Valve Developer Wiki',
    url: 'https://developer.valvesoftware.com/wiki/List_of_Deadlock_console_commands_and_variables',
    revision: 'oldid=509699',
    revisionUrl:
      'https://developer.valvesoftware.com/w/index.php?title=List_of_Deadlock_console_commands_and_variables&oldid=509699',
  },
  site: {
    label: 'เขียนโดยเว็บนี้',
    url: null,
    revision: null,
    revisionUrl: null,
  },
} as const;

/** Date the Commands page was translated from the pinned source revisions. */
export const translatedOn = '2026-11-24';

export type SourceId = keyof typeof sources;

export const sourceIds = Object.keys(sources) as [SourceId, ...SourceId[]];

// The Items page the item list was taken from; each item also records its own page and revision.
export const itemsSource = {
  label: 'deadlock.wiki — Items',
  url: 'https://deadlock.wiki/Items',
  revision: 'oldid=244252',
  revisionUrl: 'https://deadlock.wiki/index.php?title=Items&oldid=244252',
  fetchedOn: '2026-11-24',
} as const;
