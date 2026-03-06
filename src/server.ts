import fastify from "fastify";

const server= fastify({logger: true});

const teams = [
    {id:1, name: "Ferrari"},
    {id:2, name: "Mercedes"},
    {id:3, name: "Red Bull"},
    {id:4, name: "McLaren"},
];  

const drivers = [
    {id:1, name: "Lewis Hamilton", teamId: 2},
    {id:2, name: "Max Verstappen", teamId: 3},
    {id:3, name: "Charles Leclerc", teamId: 1},
    {id:4, name: "Lando Norris", teamId: 4}
];

server.get("/teams", async(request, response) => {
  response.type("application/json").code(200);
    return {teams};
});

server.get("/drivers", async(request, response) => {
    response.type("application/json").code(200);
    return {drivers};
});

interface DriversParam {
    id: string
}

server.get<{ Params: DriversParam }>("/drivers/:id", async(request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find(d => d.id === id);
    if (driver) {
        response.type("application/json").code(200);
        return { driver };
    } else {
        response.type("application/json").code(404);
        return { message: "Driver not found" };
    }
});

server.listen({port: 3333}, () => {
    console.log("Server is running on port 3333");
});