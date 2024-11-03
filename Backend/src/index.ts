import server from './server';
import { normalizePort } from './utils/normalizePort';

const port: any = normalizePort(process.env.PORT || '8000');

server.listen(port, () => console.log(`Express server started at: http://localhost:${port}`));
