import {apply, branchAndMerge, chain, mergeWith, move, Rule, template, Tree, url} from '@angular-devkit/schematics';
import {Schema} from './schema';
import * as stringUtils from '@schematics/angular/strings';

export default function (options: Schema): Rule {
  const templateSource = apply(url('./files'), [
    template({
      utils: stringUtils,
      dot: '.',
      ...options as object
    })
  ]);

  return chain([
    branchAndMerge(chain([
      mergeWith(templateSource),
      move(options.directory)
    ]))
  ]);
}
