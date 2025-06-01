import type { TaskCategory } from './types';

export const PREDEFINED_PERSONAL_CATEGORY_NAMES = {
  personal: 'Personal',
  work: 'Work',
  list1: 'List 1',
} as const;

export const PERSONAL_CATEGORIES = [
  {
    url: `/lists/personal`,
    name: PREDEFINED_PERSONAL_CATEGORY_NAMES.personal,
    taskCount: 0,
    categoryColor: '#6c757d', // neutral gray
  },
  {
    url: '/lists/work',
    name: PREDEFINED_PERSONAL_CATEGORY_NAMES.work,
    taskCount: 0,
    categoryColor: '#28a745', // green
  },
  {
    url: '/lists/list-1',
    name: PREDEFINED_PERSONAL_CATEGORY_NAMES.list1,
    taskCount: 0,
    categoryColor: '#ffc107', // yellow
  },
] as const satisfies TaskCategory[];

export const TIME_FILTERED_CATEGORIES = [
  {
    name: 'Today',
    url: '/tasks/today',
    iconName: 'today',
    categoryColor: 'var(--text-muted)',
  },
  {
    name: 'Upcoming',
    url: '/tasks/upcoming',
    iconName: 'chevron-right',
    categoryColor: 'var(--text-muted)',
  },
  {
    name: 'Sticky Wall',
    url: '/tasks/stickywall',
    iconName: 'note',
    categoryColor: 'var(--text-muted)',
  },
];

export const CUSTOM_ERROR_MESSAGES = {
  'value-missing': 'This field is required',
  'pattern-mismatch': 'The entered value does not match the required format',
  'too-short': 'The entered value is too short',
  'too-long': 'The entered value is too long',
  'range-overflow': 'The entered value is greater than the maximum allowed',
  'range-underflow': 'The entered value is less than the minimum allowed',
  'type-mismatch': 'The entered value is not of the correct type',
  'bad-input': 'The entered value is invalid',
  'custom-error': 'The entered value is not valid',
};
