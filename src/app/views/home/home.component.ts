import { PessoasService } from './../../services/Pessoas.service';
import { MatDialog } from '@angular/material/dialog';
import { ElementDialogComponent } from './../../shared/element-dialog/element-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Pessoa } from 'src/app/models/Pessoas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PessoasService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id_pessoa', 'nome_pessoa', 'funcao_pessoa', 'id_equipe', 'opcoes'];
  dataSource!: Pessoa[];

  constructor(
    public dialog: MatDialog,
    public PessoasService: PessoasService
    ) {
      this.PessoasService.getElements()
        .subscribe((data: Pessoa[]) => {
          console.log(data);
          this.dataSource = data;
        });
   }

  ngOnInit(): void {
  }
  openDialog(element: Pessoa | null): void {
  const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ?{
        id_pessoa: null,
        nome_pessoa: '',
        funcao_pessoa: '',
        id_equipe: null
      } : {
        id_pessoa: element.id_pessoa,
        nome_pessoa: element.nome_pessoa,
        funcao_pessoa: element.funcao_pessoa,
        id_equipe: element.id_equipe
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        console.log(result);
        if(this.dataSource.map(p => p.nome_pessoa).includes(result.nome_pessoa)) {
        this.dataSource[result.nome_pessoa - 1] = result;
        this.table.renderRows();
      } else {
        this.PessoasService.createElements(result)
          .subscribe((data: Pessoa) => {
            this.dataSource.push(result);
            this.table.renderRows();
          });
       }
      }
    });
  }
  editElement(element: Pessoa): void{
    this.openDialog(element);
  }
 
  deleteElement(id_pessoa: number): void {
    this.PessoasService.deleteElement(id_pessoa)
    .subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id_pessoa !== id_pessoa);
    });
  }
}
