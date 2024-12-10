import { Request, Response } from "express";

class SSE {
  conn: Record<string, Response>[] = [];
  async connect(req: Request, res: Response){

    res.writeHead(200, {
      "cache-control": "no-cache",
      "content-type": "text/event-stream",
      "connection": "keep-alive"
    });

    res.on("close", () => {
      this.conn = this.conn.filter((conn) => Object.values(conn)[0] !== res);
      console.log("SSE connection closed");
    });

    console.log("SSE connection established");

    this.conn.push({ [req.query.id as string]: res});
  }

  send(body: { id: string; message: string; }){
    console.log(body);
    // filter connection based on ID
    const conn = this.conn?.filter((conn) => Object.keys(conn)[0] === body.id);
    if(!conn.length){
      return;
    }
    conn[0][body.id].write(`data: ${body.message}\n\n`);
  }
}

export const sse = new SSE();