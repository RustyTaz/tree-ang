import { Component, Input } from '@angular/core';

export interface TreeNode {
  id?: number;
  name: string;
  checked: boolean;
  expanded: boolean;
  parent: TreeNode | null;
  submenu: TreeNode[];
  indeterminate: boolean;
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
  selectedNodes: number[] = [];
  receivedValue: string = '';

  ngOnInit(): void {
    this.tree = this.buildTree(this.dataTree);
    console.log(this.tree);
  }

  buildTree(data: any[]): TreeNode[] {
    let i = 0;
    const rootNode: TreeNode = {
      name: 'root',
      checked: false,
      expanded: false,
      parent: null,
      submenu: [],
      indeterminate: false,
    };
    for (; i < data.length; i++) {
      this.appendElem(rootNode, data[i], 0);
    }
    return rootNode.submenu;
  }

  /** Рекурсивно возвращает древовидный объект по введенным параметрам */
  appendElem(parentNode: TreeNode, data: any, level: number) {
    const fields = this.fields;
    const length = fields.length - 1;
    let name = fields[level];

    const submenu = parentNode.submenu;
    if (level < length) {
      /** @TODO Возможно оптимизировать, хотя может и не надо */
      let groupNode = submenu.find((item: any) => item.name === data[name]);
      if (!groupNode) {
        groupNode = {
          name: data[name],
          checked: false,
          expanded: false,
          parent: parentNode,
          submenu: [],
          indeterminate: false,
        };
        submenu.push(groupNode);
      }
      this.appendElem(groupNode, data, ++level);
    } else {
      name = String(data['name']);
      submenu.push({
        id: data['id'],
        name: name == '' ? String(data['id']) : name,
        checked: false,
        expanded: false,
        parent: parentNode,
        submenu: [],
        indeterminate: false,
      });
    }
  }

  receiveValue(value: TreeNode) {
    //console.log(value);
    this.getChildrenNodes(value, value.checked);
    this.checkIndeterminate(value);
  }
  printParentNames(value: TreeNode) {
    if (value.parent !== null) {
      console.log(value.parent.name);
      this.printParentNames(value.parent);
    } else {
      console.log('Reached the root of the tree');
    }
  }

  checkChildChecked(value: TreeNode, methodType: 'add' | 'remove') {
    if (value.parent) {
      if (methodType === 'remove') {
        if (value.parent.submenu.every((item) => !item.checked)) {
          value.parent.checked = false;
        }
      } else {
        if (value.parent.submenu.every((item) => item.checked)) {
          value.parent.checked = true;
        }
      }
    }
  }
  
  checkIndeterminate(value: TreeNode) {
    if (value.parent) {
      let lengthCheckedSubmenuNodes = value.parent.submenu.filter(
        (node) => node.checked
      ).length;
      let lengthIndeterminateubmenuNodes = value.parent.submenu.filter(
        (node) => node.indeterminate
      ).length;
      if (
        (lengthCheckedSubmenuNodes > 0 &&
          lengthCheckedSubmenuNodes != value.parent.submenu.length) ||
        lengthIndeterminateubmenuNodes
      ) {
        console.log('if', value.parent);
        value.parent.indeterminate = true;
        // value.parent.checked = false;
      } else if (lengthCheckedSubmenuNodes === value.parent.submenu.length) {
        console.log('else if', value.parent);
        value.parent.indeterminate = false;
        // value.parent.checked = true;
      } else {
        value.parent.indeterminate = false;
      }
    }
    if (value.parent) {
      this.checkIndeterminate(value.parent);
    }
  }

  getChildrenNodes(value: TreeNode, checked: boolean) {
    value.checked = checked;

    if (value.checked) {
      this.addSelectedNode(value.id);
      this.checkChildChecked(value, 'add');
    } else {
      this.removeSelectedNode(value.id);
      this.checkChildChecked(value, 'remove');
    }

    if (value.submenu.length > 0) {
      for (const childNode of value.submenu) {
        this.getChildrenNodes(childNode, value.checked);
      }
    }
  }

  addSelectedNode(value?: number) {
    if (value) {
      this.selectedNodes.push(value);
    }
  }

  removeSelectedNode(value?: number) {
    this.selectedNodes = this.selectedNodes.filter((node) => node !== value);
  }
}
