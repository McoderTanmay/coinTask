import { CreateAndUpdate } from "../services/backgroundJob.js"; 

async function test(req, res) {
    try {
        await CreateAndUpdate();
        return res.status(200).json({code:200, status:"success"});
    } catch (error) {
        return res.status(500).json({code:500, status:"failed"});
    }
}

export {test};