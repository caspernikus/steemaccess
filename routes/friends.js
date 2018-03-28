const express = require('express');
const { authenticate } = require('../helpers/middleware');
const { getAccountHistory } = require('../helpers/friends');

const router = express.Router(); // eslint-disable-line new-cap

/** Get my friend list */
router.all('/me', authenticate(), async (req, res) => {
  const trxType = 'custom_json';
  const findType = 'friend_list';
  let start = 0;
  let limit = 100;
  let found = false;
  let jsonFriendList = {};

  while (!found) {
  	try {
		let result = await getAccountHistory(start, limit, req);
		const length = result.length - 1;

		if (length === 0) {
			found = true;
		}

		for (var index = 0; index < result.length; index++) {
			const trans = result[index];

	    	if (found) { continue; }
			if (trans[1].op[0] !== trxType) {
				if (index === length) {
					start = trans[0] - length;
				}

				continue;
			}

			try {
		        const json = JSON.parse(trans[1].op[1].json);

		        if (json.type !== findType) {
		        	if (index === length) {
						start = trans[0] - length;
					}

					continue;
		        }

		        jsonFriendList = json;
		        found = true;
		        continue;
		    } catch (e) {
		    	if (index === length) {
					start = trans[0] - length;
				}
		        continue;
		    }
		}

		if (start < limit) {
  			limit = start;
  		}

		if (start < 0) {
			let newLimit = start + length;
			start = 0;
			limit = newLimit;
		}

		if (start === 0 && limit === 0) {
			found = true;
		}
	} catch (err) {
		req.log.error(err, 'me: SteemFriends request failed', req.user);
    	res.status(501).send('SteemFriends request failed');
    	return;
	}
  }

  res.json({
    user: req.user,
    _id: req.user,
    name: req.user,
    friendList: jsonFriendList,
  });
  return;
});

module.exports = router;