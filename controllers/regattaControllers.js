//controllers\regattaControllers.js
const Regatta = require('../models/Regatta');

exports.createRegatta = async (req, res) => {
    const { name } = req.body;
    const ownerId = req.userId;
    if (!name) {
        return res.status(400).json({ message: "El nombre de la regata es obligatorio." });
    }
    try {
        const newRegatta = await Regatta.create({
            owner: ownerId,
            name: name,
            isLive: true, 
            participants: [ownerId],
            createdAt: new Date()
        });
        res.status(201).json(newRegatta);
    } catch (e) {
        console.error("Error creating regatta:", e);
        res.status(500).json({ message: "Error interno al crear la regata.", error: e.message });
    }
};

exports.listRegattas = async (req, res) => {
    try {
        const regs = await Regatta.find({ owner: req.userId })
                                    .populate('owner', 'username email')
                                    .populate('participants', 'username') 
                                    .sort({ createdAt: -1 });
        res.status(200).json(regs);
    } catch(e) {
         console.error("Error listing user regattas:", e);
        res.status(500).json({ message: "Error interno al listar las regatas.", error: e.message });
    }
};

exports.listActiveRegattas = async (req, res) => {
    try {
        const activeRegattas = await Regatta.find({ isLive: true })
                                            .populate('owner', 'username')
                                            .populate('participants', 'username')
                                            .sort({ createdAt: -1 });
        res.status(200).json(activeRegattas);
    } catch (e) {
        console.error("Error listing active regattas:", e);
        res.status(500).json({ message: "Error interno al listar regatas activas.", error: e.message });
    }
};

exports.joinRegatta = async (req, res) => {
    const { regattaId } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(regattaId)) {
         return res.status(400).json({ message: "ID de regata inválido." });
    }
    try {
        const updatedRegatta = await Regatta.findByIdAndUpdate(
            regattaId,
            { $addToSet: { participants: userId } }, // $addToSet evita duplicados
            { new: true }
        ).where('isLive').equals(true);

        if (!updatedRegatta) {
            return res.status(404).json({ message: "Regata no encontrada o no activa." });
        }
        res.status(200).json({ message: "Te has unido a la regata.", regatta: updatedRegatta });
    } catch (e) {
         console.error("Error joining regatta:", e);
        res.status(500).json({ message: "Error interno al unirse a la regata.", error: e.message });
    }
};