/***
import pandas as pd
import xlsxwriter

wep = pd.read_csv('wep.csv')
wep['Excepcions']=wep['Excepcions'].fillna('')

PRC = {'La Tinta': '#f1aee7', 'Mataró': '#6aa84f', 'Brusi': 'lime', 'L’anònima del Clot': 'magenta',
			 'Besòs Verd': 'red', 'Sòl Ben Moll': 'green' , 'ALBA Sincrotró': '#ffff00', 'El Guinardó':'yellow'}
llistes = xlsxwriter.Workbook('llistes.xlsx')
full = llistes.add_worksheet('llistes')
color_grup = llistes.add_format({'bold': True, })
cell_format = llistes.add_format({'bold': True, 'bg_color': '#7da7d8', 'font_name': 'Arial', 'font_size':10})
cell_format1 = llistes.add_format({'bold': True, 'bg_color': '#7da7d8', 'align': 'center', 'font_name': 'Arial', 'font_size':10})
cell_format2 = llistes.add_format({'align': 'center', 'font_name': 'Arial', 'font_size':10})

def capçalera(PR, i):
		full.write('B'+str(i), PR, color_grup)
		full.write('B'+str(i+1), 'nom', cell_format)
		full.write('C'+str(i+1), 'id', cell_format)
		full.write('D'+str(i+1), 'excepcions', cell_format)
		full.write('E'+str(i+1), 'Cistella', cell_format1)
		full.write('F'+str(i+1), 'Fruita', cell_format1)
		full.write('G'+str(i+1), 'Ous', cell_format1)
		full.write('H'+str(i+1), 'CP', cell_format1)
	  
def filera(fila, i):
		cistella = ''
		if wep['Petita'][i] == 1:
				cistella = cistella + 'P'
		if wep['Petita'][i] > 1:
				cistella = cistella + str(wep['Petita'][i]) + 'P'
		if wep['Mitjana'][i] == 1:
				cistella = cistella + 'M'
		if wep['Mitjana'][i] > 1:
				cistella = cistella + str(wep['Mitjana'][i]) + 'M'
		if wep['Gran'][i] == 1:
				cistella = cistella + 'G'
		if wep['Gran'][i] > 1:
				cistella = cistella + str(wep['Gran'][i]) + 'G'
			  
		full.write('A'+str(fila), i+1, cell_format2)
		full.write('B'+str(fila), wep['Nom'][i])
		full.write('C'+str(fila), wep['Id Usuari'][i])
		full.write('D'+str(fila), wep['Excepcions'][i])
		full.write('E'+str(fila), cistella, cell_format2)
		full.write('F'+str(fila), wep['Fruita'][i], cell_format2)
		full.write('G'+str(fila), wep['Ous'][i], cell_format2)
		full.write('H'+str(fila), wep['Patata i Ceba'][i], cell_format2)


L = len(wep)
PR = wep['Punt Recollida'][0]
color = PRC[wep['Punt Recollida'][0]]
color_grup = llistes.add_format({'bold': True, 'bg_color': color})
capçalera(PR,1)
fila = 3

for i in range(L):
	  
		if wep['Punt Recollida'][i] != PR:
				color = PRC[wep['Punt Recollida'][i]]
				color_grup = llistes.add_format({'bold': True, 'bg_color': color})
				PR = wep['Punt Recollida'][i]
				capçalera(PR,fila)
				fila = fila + 2
		try:
				filera(fila,i)
				fila = fila + 1
		except:
				pass
	  
llistes.formats[0].set_font_name('Arial')
llistes.formats[0].set_font_size(10)
full.set_column('A:A', 3)
full.set_column('B:B', 22)
full.set_column('D:D', 30)
full.set_column('E:H', 7)

llistes.close()
 */

import { getData } from './downloadCSV'
import pickupPoints from '../constants/pickpoints'

// All the Python code before transformed into typescript:
export default async function downloadXLSL(data, week) {
	const json = await getData(data)
	const XLSX = await import('xlsx')
	const workbook = XLSX.utils.book_new()
	const worksheet = XLSX.utils.json_to_sheet(json)

	XLSX.utils.book_append_sheet(workbook, worksheet, 'llista')
	XLSX.writeFile(workbook, `${week.name}.xlsx`)
}
