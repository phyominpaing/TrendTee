const asyncHandler = (controllerFn) => (req, res, next) => {
    Promise.resolve(controllerFn(req, res, next)).catch(next);
};
export default asyncHandler;
//# sourceMappingURL=asyncHandler.js.map