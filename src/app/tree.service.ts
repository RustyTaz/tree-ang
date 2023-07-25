import { Injectable } from '@angular/core';

interface TreeNode {
  [key: string]: TreeNode | string;
}

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  //метод построения дерева разной глубины в зависимости от входных параметров 
 buildTree(data: any[], fields: string[]): TreeNode {
    const tree: TreeNode = {};

    data.forEach((item) => {
      let currentNode = tree;

      fields.forEach((field, index) => {
        const value = item[field];

        if (!currentNode[value]) {
          currentNode[value] = index === fields.length - 1 ? value : {};
        }

        currentNode = currentNode[value] as TreeNode;
      });
    });

    return tree;
  }
}
