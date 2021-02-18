export interface Endpoint {
	function: (request: any, auth?: any) => Promise<unknown>,
	path: string,
	method: string,
	authed: boolean
}