const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
    try {
        const players = await prisma.player.findMany();
        res.json(players)
    } catch (error) {
        next();
    }
});

router.post("/", async (req, res, next) => {
    try {
        const {name, breed} = req.body;

        if (!name || !breed) {
            const error = {
                status: 400,
                message: "Player must have a name and breed.",
            };

            return next(error)
        }

        const player = await prisma.player.create({data: {name, breed}});
        res.status(201).json(player);
    } catch (error) {
        next();
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id;

        const player = await prisma.player.findUnique({where: {id}})

        if (!player) {
            return next({
                status: 404,
                message: `Could not find author with id ${id}.`,
            });
        }

        res.json(player)

    } catch (error) {
        next();
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id;

        const playerExists = await prisma.player.findUnique({where: {id}});
        if (!playerExists) {
            return next({
                status: 404,
                message: `Could not find player with id ${id}.`,
            });
        }

        const {status} = req.body;

        if (!status ) {
            return next({
                status: 400,
                message: "Player may only have a status of BENCH or FIELD.",
            });
        }
        const player = await prisma.player.update({where: {id}, data: {status},});
        res.json(player)
    } catch (error) {
        next();
    }
}) ;

router.delete("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id;
        const playerExists = await prisma.player.findUnique({where: {id}});
        if (!playerExists) {
            return next({
                status: 404,
                message: `Could not find player with id ${id}.`,
            });
        };

        await prisma.player.delete({where: {id}})
        res.sendStatus(204);
    } catch (error) {
        next();
    }
})