# SteemAccess

## What is it about ?
SteemAccess is originaly a fork from SteemConnect, the only identity layer for the steem blockchain. SteemAccess tries to provide a whole new user experience by extending this identity layer as an access layer for the steem blockchain. 
SteemAccess will be an Access Layer + Identity Layer!

**What is an access layer?** 
> A data access layer (DAL) in computer software, is a layer of a computer program which provides simplified access to data stored in persistent storage of some kind, such as an entity-relational database.

**What does this mean for Steem?**
It is possible to save custom jsondata on top of a user account on the steem blockchain. This ability is used to create certain functionalities (e.g friendlists), which can be easily accessed for apps via SteemAccess. Meaning only authorized applications are able to fetch (to have access) the json data with the help of SteemAccess's API!

**What else features does SteemAccess have?**
- Multi Account Management -> No more nasty cookie deleting to switch account. (IMPLEMENTED)
- Quick Pay Button -> An API Point for authorized Applications / Users to embed via iFrame an easy to use 'Pay with Steem' Button
- Dashboard & Wallet Management -> A better management of your wallet and profile with statistics
- Activity -> See your latest activity combined with:
- Notifications -> It will take a while to implement this, but it will allow access of authorized apps to access and present notifications for user accounts


SteemAccess is in early development and should not be used live ! 
