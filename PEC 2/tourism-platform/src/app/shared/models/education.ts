export class Education {
  id: number;
  type: 'titulo universitario' | 'ciclo formativo';
  level: 'grado' | 'diplomado' | 'licenciado' | 'ingeniero' | 'master' | 'doctorado' | 'grado superior' | 'grado medio';
  name: string;
  university: string;
  finishDate: string;
}
