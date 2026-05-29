function formatToDateOnly(date) {
  if (!date) return undefined;
  return new Date(date).toISOString().split('T')[0];
}

module.exports = {
  formatToDateOnly,
};
