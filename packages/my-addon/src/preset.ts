export function managerEntries(entry: unknown[] = []): unknown[] {
  return [...entry, require.resolve('./preset/register')];
}
