const truncateAccount = (account) => {
  const accountString = account.split("");
  const firstPart = accountString.filter((_, index) => index < 5);
  const lastPart = accountString.filter(
    (_, index) => index > accountString.length - 3
  );
  return [...firstPart, "...", ...lastPart].join("");
};

export default truncateAccount;
