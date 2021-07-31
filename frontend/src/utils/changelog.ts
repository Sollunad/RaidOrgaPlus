import { Changelog } from "@/models/Changelog";

export const changelogs: Changelog[] = [
	{
		version: 'v2.1.0',
		release: '03.07.2021',
		features: [
			'Theme wechsel eingaubt.',
			'Auswahl möglichkeiten zwischen dem Light-Theme, dem neuem Dark Theme (Standard) und dem altem, leicht angepassten Dark Theme.'
		],
		subversions: [
			{
				version: 'v.2.1.1',
				release: 'WIP',
				features: [
					'WIP'
				]
			}
		]
	},
	{
		version: 'v2.0.0',
		release: '31.08.2019',
		features: [
			'Open Beta!',
			'Update auf Vuetify 2.0 - UI-Änderungen',
			'CMs markieren',
			'Besser Navigation innerhalb von Raids',
			'Einteilung des Archivs in Seiten',
			'Fortlaufende Termine erstellen'
		],
		subversions: [
			{
				version: 'v.2.0.5',
				release: '04.06.2021',
				features: [
					'Überarbeitung des Favoriten Systems',
					'Anstelle von einem Stern, nun bis zu 3 Sterne mit farblicher abstufung.',
					'Rollen vergabe von Raid-Rollen im Discord wird nun über RO+ geregelt.'
				]
			},
			{
				version: 'v.2.0.4',
				release: '19.03.2021',
				features: [
					'Anlage von Extra Accounts über die Profil Seite ermöglicht'
				]
			},
			{
				version: 'v2.0.3',
				release: '01.02.2020',
				features: [
					'Dialogbreiten im Firefox gefixt',
				]
			},
			{
				version: 'v2.0.2',
				release: '20.01.2020',
				features: [
					'Extra-Rollen für Kite und Spezial-Einträge',
					'Menüleiste auf Mobilgeräten gefixt',
					'GCG als Spielereintrag hinzugefügt',
					'Raidleiter können alle Anmeldungen ändern'
				]
			},
			{
				version: 'v2.0.1',
				release: '26.12.2019',
				features: [
					'Live-Aufstellungen',
					'Legendäre Trophäen aus Coffern werden mitgezählt',
					'Anmeldungen visuell überarbeitet'
				]
			},
		]
	},
	{
		version: 'v1.2.0',
		release: '11.07.2019',
		features: [
			'Nutzerprofile',
			'Discord-Integration',
			'Übersicht über kommende Termine'
		],
		subversions: [
			{
				version: 'v1.2.1',
				release: '26.07.2019',
				features: [
					'Homepage und Profile redesigned',
					'Erfolge sind jetzt im Profil',
					'Kleinere visuelle Verbesserungen',
					'Reports beinhalten jetzt ein Combat Replay'
				]
			},
		]
	},
	{
		version: 'v1.1.0',
		release: '08.05.2019',
		features: [
			'Builds in Spielerliste nach Rollen filtern',
			'Erfolgs-Übersicht',
			'Raidleiter in Spielerliste zuerst anzeigen',
			'Kennzeichnen von fehlenden Anmeldungen in Liste',
			'Namen von einem Boss zum anderen kopieren',
			'Buff-Wings hervorheben',
			'Visual Overhaul der Aufstellungen'

		],
		subversions: [
			{
				version: 'v1.1.1',
				release: '05.07.2019',
				features: [
					'Logs hochladen und anzeigen'

				]
			}
		]
	},
	{
		version: 'v1.0.0',
		release: '26.02.2019',
		features: [
			'Spielerliste',
			'Termine / Archiv',
			'Blankos',
			'Meine Builds',
			'Weekly Progress',
			'LI / LD',
		],
		subversions: []
	},
];

export default changelogs;