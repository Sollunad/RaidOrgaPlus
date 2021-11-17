import { Class } from "./Klasse";
import { Role } from "./Rolle";

export interface Build {
	class: Class;
	role: Role[];
	prefer: number;
}