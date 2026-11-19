import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_MESSAGES,
  filterMessages,
  getUnreadCounts,
  markMessageRead,
  moveMessageToFolder,
  createDraftMessage,
} from './mailStore';

test('filterMessages filters by folder and search query case-insensitively', () => {
  const inboxAll = filterMessages(INITIAL_MESSAGES, 'inbox', '');
  assert.equal(inboxAll.length, 3);

  const pgpMatches = filterMessages(INITIAL_MESSAGES, 'inbox', 'PGP/MIME');
  assert.equal(pgpMatches.length, 1);
  assert.equal(pgpMatches[0].id, 'msg-1');

  const noneMatches = filterMessages(INITIAL_MESSAGES, 'inbox', 'nonexistent_token_xyz');
  assert.equal(noneMatches.length, 0);
});

test('getUnreadCounts counts unread messages per folder accurately', () => {
  const counts = getUnreadCounts(INITIAL_MESSAGES);
  assert.equal(counts.inbox, 2);
  assert.equal(counts.sent, 0);
  assert.equal(counts.drafts, 0);
});

test('markMessageRead updates unread state and unread counter', () => {
  const updated = markMessageRead(INITIAL_MESSAGES, 'msg-1', false);
  const counts = getUnreadCounts(updated);
  assert.equal(counts.inbox, 1);
  assert.equal(updated.find((m) => m.id === 'msg-1')?.unread, false);
});

test('moveMessageToFolder moves a message to archive and marks it read', () => {
  const updated = moveMessageToFolder(INITIAL_MESSAGES, 'msg-2', 'archive');
  assert.equal(filterMessages(updated, 'inbox', '').length, 2);
  assert.equal(filterMessages(updated, 'archive', '').length, 2);
  assert.equal(updated.find((m) => m.id === 'msg-2')?.unread, false);
});

test('createDraftMessage prepends a new draft to drafts folder', () => {
  const { messages, createdId } = createDraftMessage(INITIAL_MESSAGES, {
    toEmail: 'dev@luminamail.org',
    subject: 'Test patch MSYS2',
    body: 'Verifica compilazione completata.',
  });
  const drafts = filterMessages(messages, 'drafts', '');
  assert.equal(drafts.length, 2);
  assert.equal(drafts[0].id, createdId);
  assert.equal(drafts[0].toEmail, 'dev@luminamail.org');
});
