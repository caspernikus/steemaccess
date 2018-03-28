const getAccountHistory = async (start, limit, req) => {
	if (start === 0) {
		start = -1;
	}

	try {
	    result = await req.steem.api.getAccountHistoryAsync(req.user, start, limit);
	    return result;
    } catch (error) {
	    throw new Error(error);
    }

    return {};
};

module.exports = {
  getAccountHistory,
};