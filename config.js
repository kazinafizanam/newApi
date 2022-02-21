const env = process.env.NODE_ENV || "production";


const config = {
    development: {
        APIKey: "9g00irxhS_iLjWNkF7iHDw",
        APISecret: "vJXbqIYZPGZMv5xhwnVKaqs5IKBfOmwAhNuu",
    },
    production: {
        APIKey: "9g00irxhS_iLjWNkF7iHDw",
        APISecret: "vJXbqIYZPGZMv5xhwnVKaqs5IKBfOmwAhNuu",
    },
};

module.exports = config[env];
