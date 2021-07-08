const standardRouter = (router, standardControllerSet) => {
  router.post("/", standardControllerSet.create);
  router.get("/", standardControllerSet.list);
  router.get("/i_:include", standardControllerSet.listInclude);
  router.get("/:id", standardControllerSet.detail);
  router.get("/:id/i_:include", standardControllerSet.detailInclude);
  router.put("/:id", standardControllerSet.update);
  router.delete("/:id", standardControllerSet.remove);
};

module.exports = standardRouter;
