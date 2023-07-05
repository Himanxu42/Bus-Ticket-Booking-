const getAuthDetails = (req) => {
  if (req.cookies.auth)
    return {
      status: true,
      user_id: req.cookies.user_id,
      role: req.cookies.role,
    };
  return false;
};

const paymentStore = new Map();

module.exports = { getAuthDetails, paymentStore };
