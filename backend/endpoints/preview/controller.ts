import * as _aufstellung from '../aufstellungen/aufstellung';
import * as _element from '../aufstellungen/element';
import * as _preview from './preview';
import * as _roles from '../../authentication/role';
import { Request } from 'express';
import { Aufstellung } from 'models/Aufstellung';
import { Encounter } from 'models/Encounter';
import { Authentication } from 'models/Auth';
import { OkPacket } from 'mysql';
import { ControllerEndpoint } from 'models/ControllerEndpoint';

const endpoints: ControllerEndpoint[] = [
    {function: getAufstellungen, path: '', method: 'get', authed: false},
    {function: getElements, path: '/elements', method: 'get', authed: false},
    {function: setPreviewable, path: '/able', method: 'post', authed: true},
    {function: getPreviewable, path: '/able', method: 'get', authed: true},
];
export default endpoints;

async function getAufstellungen(req: Request): Promise<(Aufstellung & Encounter)[]> {
    const termin = parseInt(req.query.termin as string);
    if (termin) {
        const isPreviewable = (await _preview.isPreviewable(termin))[0];
        if (isPreviewable) return await _aufstellung.getForTermin(termin);
    }
    return [];
}

async function getElements(req: Request): Promise<any> {
    const termin = parseInt(req.query.termin as string);
    if (termin) {
        const isPreviewable = (await _preview.isPreviewable(termin))[0];
        if (isPreviewable) return await _element.getForTermin(termin);
    }
    return [];
}

async function setPreviewable(req: Request, authentication: Authentication): Promise<OkPacket> {
    const termin = req.body.termin;
    const able = req.body.able;
    if (termin && (able || able === false)) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) {
            const ableValue = able? 1 : 0;
            return await _preview.setPreviewable(termin, ableValue);
        }
    }
    return;
}

async function getPreviewable(req: Request, authentication: Authentication): Promise<boolean> {
    const termin = parseInt(req.query.termin as string);
    if (termin) {
        const role = await _roles.forTermin(authentication, termin);
        if (role > 0) {
            const isPreviewable = (await _preview.isPreviewable(termin))[0];
            return (!!isPreviewable);
        }
    }
    return;
}