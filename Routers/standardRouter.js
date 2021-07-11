const standardRouter = (router, standardControllerSet) => {
  router.post("/", standardControllerSet.create);
  router.get("/", standardControllerSet.list);
  router.get("/:include([A-z]+)/", standardControllerSet.listInclude);
  router.get("/:id([0-9]+)/", standardControllerSet.detail);
  router.get("/:id([0-9]+)/:include([A-z]+)/", standardControllerSet.detailInclude);
  router.put("/:id([0-9]+/)", standardControllerSet.update);
  router.delete("/:id([0-9]+/)", standardControllerSet.remove);
};

module.exports = standardRouter;
