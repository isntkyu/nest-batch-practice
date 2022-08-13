export const transactionPromiseHandle = (
  values: PromiseSettledResult<any>[],
) => {
  return values.reduce((acc, curr) => {
    const { status } = curr;
    const value = curr['value'] ? curr['value']['list'] : curr['reason'];
    if (acc[status]) {
      if (status === 'fulfilled') acc[status] = acc[status].concat(value);
      else acc[status].push(value);
    } else acc[status] = [value];
    return acc;
  }, {});
};
