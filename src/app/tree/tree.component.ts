import { Component, Input } from '@angular/core';

export interface TreeNode {
  id?: number;
  name: string;
  checked: boolean;
  expanded: boolean;
  submenu: TreeNode[];
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent {
  @Input() dataTree!: any[];

  tree?: TreeNode[];
  fields = ['enterpriseName', 'vehicleTypeName', 'modelName', 'name'];

  ngOnInit(): void {
    this.tree = this.buildTree(this.dataTree);
    console.log(this.tree);
  }

  buildTree(data: any[]) {
    let i = 0;
    const _data: TreeNode[] = [];
    for (; i < data.length; i++) {
      this.appendElem(_data, data[i], 0);
    }
    return _data;
  }

  /** Рекурсивно возвращает древовидный объект по введенным параметрам */
  appendElem(out: TreeNode[], data: any, level: number) {
    const fields = this.fields;
    const length = fields.length - 1;
    let name = fields[level];
    if (level < length) {
      let groupNode = out.find((item: any) => item.name === data[name]);
      if (!groupNode) {
        groupNode = {
          name: data[name],
          checked: false,
          expanded: false,
          submenu: [],
        };
        out.push(groupNode);
      }
      this.appendElem(groupNode.submenu, data, ++level);
    } else {
      name = String(data['name']);
      out.push({
        id: data['id'],
        name: name == '' ? String(data['id']) : name,
        checked: false,
        expanded: false,
        submenu: [],
      });
    }
  }
}
