import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Patients} from '../models/patients';
import {Budgets} from '../models/budgets';
import {TreatmentsBudget} from '../models/treatmentsBudget';
import {CurrencyPipe} from '@angular/common';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfService {
    logoUrl = "../../assets/images/logo-pdf.png";
    logoImg = new Image();


    totalPrice;
    body = [];
    docDefinition = {};

    constructor(private _apiService: ApiService,
                private _currencyPipe: CurrencyPipe) {
        this.logoImg.src = this.logoUrl;
    }

    budgetPDF(budget: Budgets) {
        this._apiService.getPatientByRut(budget.patientRut).subscribe(response => {
            const patient: Patients = response.data;
            const date = new Date(budget.date);
            this.docDefinition = {
                footer: function (currentPage, pageCount) {
                    return [{
                        text: [
                            {
                                text: 'Dirección: Rodriguez #475C, Fonos: +569 9063 5096 - (45)2651675',
                                alignment: 'center'
                            },
                            {text: '\nPágina ' + currentPage.toString() + ' de ' + pageCount, alignment: 'center'}
                        ]
                    }];
                },
                content: [
                    {
                        columns: [
                            {
                                width: '*',
                                text: 'Dra. Bella Henriquez Romero\n' +
                                'Cirujano Dentista\n' +
                                'RUT: 16.980.760-4\n' +
                                'Fonos: +569 6136 9976 - (45)2651675\n'
                            },
                            {
                                width: 200,
                                image: this.getLogoImage()
                            }
                        ],
                        columnGap: 10
                    },
                    {text: '\nPRESUPUESTO\n\n', style: 'header'},
                    {
                        columns: [
                            {
                                width: '*',
                                text: [
                                    {text: 'RUT DEL PACIENTE: ', bold: true},
                                    patient.rut + '\n',
                                    {text: 'NOMBRE: ', bold: true},
                                    patient.firstName + ' ' + patient.lastName + '\n'
                                ]
                            },
                            {
                                width: '*',
                                text: [
                                    {text: 'DIRECCIÓN: ', bold: true},
                                    patient.address + ' ' + patient.city + ', ' + patient.country + '\n',
                                    {text: 'FECHA: ', bold: true},
                                    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
                                ]
                            }
                        ],
                        columnGap: 10
                    },
                    '\n',
                    {
                        table: {
                            headerRows: 1,
                            widths: ['*', '*', 'auto'],
                            body: this.buildTableBodyTreatments(
                                budget.treatments, [
                                    {text: 'TRATAMIENTO', bold: true},
                                    {text: 'DIENTE', bold: true},
                                    {text: 'PRECIO', bold: true}
                                ]
                            )
                        },
                        layout: 'lightHorizontalLines'
                    },
                    '\n',
                    this.showPrice(budget.discount, budget.totalPrice),
                    /**{
                        columns: [
                            {
                                width: '*',
                                text: {text: 'DESCUENTO: ', bold: true, alignment: 'right'}
                            },
                            {
                                width: 110,
                                text: this._currencyPipe.transform(
                                    (budget.totalPrice * budget.discount), 'CLP')
                            }
                        ],
                        columnGap: 10
                    },
                     {
                         columns: [
                             {
                                 width: '*',
                                 text: {text: 'PRECIO TOTAL: ', bold: true, alignment: 'right'}
                             },
                             {
                                 width: 110,
                                 text: this._currencyPipe.transform(
                                     (budget.totalPrice - budget.totalPrice * budget.discount), 'CLP')
                             }
                         ],
                         columnGap: 10
                     },*/
                    '\n\n\n\n\n\n',
                    {
                        canvas: [
                            {type: 'line', x1: (595 - 2 * 40) - 200, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 0.5}
                        ]
                    },
                    {
                        columns: [
                            {
                                width: '*',
                                text: ''
                            },
                            {
                                width: 200,
                                text: 'Dra. Bella Henriquez Romero\nCirujano Dentista',
                                alignment: 'center',
                                margin: [0, 5, 0, 0]
                            }
                        ],
                        columnGap: 10
                    }
                ],
                styles: {
                    header: {
                        alignment: 'center',
                        fontSize: 18,
                        bold: true
                    }
                }
            };

            pdfMake.createPdf(this.docDefinition).download(
                budget.patientRut + '(' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ').PDF'
            );
        }, error => {
            console.log(error);
        });
    }

    private buildTableBodyTreatments(treatments: TreatmentsBudget[], columns) {
        this.body = [];
        this.body.push(columns);
        for (let i = 0; i < treatments.length; i++) {
            this.body.push(
                [
                    treatments[i].name,
                    treatments[i].tooth.firstValue + ',' + treatments[i].tooth.secondValue,
                    {text: this._currencyPipe.transform(treatments[i].price, 'CLP'), alignment: 'right'}
                ]
            );
        }
        return this.body;
    }

    getLogoImage() {
        let image = this.logoImg;
        let canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext('2d').drawImage(image, 0, 0);
        return canvas.toDataURL('image/png')
    }

    showPrice(discount: number, totalPrice: number) {
        if (discount > 0) {
            return [{
                columns: [
                    {
                        width: '*',
                        text: {text: 'PRECIO S/D: ', bold: true, alignment: 'right'}
                    },
                    {
                        width: 110,
                        text: this._currencyPipe.transform(
                            totalPrice, 'CLP'),
                        alignment: 'right'
                    }
                ],
                columnGap: 10
            }, {
                columns: [
                    {
                        width: '*',
                        text: {text: 'DESCUENTO: ', bold: true, alignment: 'right'}
                    },
                    {
                        width: 110,
                        text: this._currencyPipe.transform(
                            (totalPrice * discount), 'CLP'),
                        alignment: 'right'
                    }
                ],
                columnGap: 10
            }, {
                columns: [
                    {
                        width: '*',
                        text: {text: 'PRECIO TOTAL: ', bold: true, alignment: 'right'}
                    },
                    {
                        width: 110,
                        text: this._currencyPipe.transform(
                            (totalPrice - totalPrice * discount), 'CLP'),
                        alignment: 'right'
                    }
                ],
                columnGap: 10
            }];
        } else {
            return {
                columns: [
                    {
                        width: '*',
                        text: {text: 'PRECIO TOTAL: ', bold: true, alignment: 'right'}
                    },
                    {
                        width: 'auto',
                        text: {
                            text: this._currencyPipe.transform((totalPrice), 'CLP'),
                            alignment: 'right'
                        }
                    }
                ],
                columnGap: 10
            };
        }
    }
}
