import { Request } from "express";
import { Authentication } from "./Auth";

export interface ControllerEndpoint {
	function: (req: Request, auth?: Authentication) => unknown;
	path: string;
	method: string;
	authed: boolean;
}