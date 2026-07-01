# Notes

The reason we don't use a global 'CI' target is that if we do so env variables gets lost and e2e tests do not work properly. We want to build the site only once, with `basePath` properly set. But if we use this build for e2e tests, those tests also need to be aware of `basePath`.
