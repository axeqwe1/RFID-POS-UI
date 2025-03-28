// import { NextApiRequest, NextApiResponse } from 'next';
// import { fetchRFID } from './RFIDapi';

// export default function handler(req:NextApiRequest, res: NextApiResponse){
//     res.setHeader('Content-Type', 'text/event-stream');
//     res.setHeader('Cache-Control', 'no-cache');
//     res.setHeader('Connection', 'keep-alive');

//     const sendRFIDData = async () => {
//         const data = fetchRFID()
//         res.write(`data: ${JSON.stringify(data)}\n\n`)

//     }


//     const interval = setInterval(sendRFIDData,1000);

//     req.on('close', () => {
//         clearInterval(interval);
//         res.end()
//     })
// }