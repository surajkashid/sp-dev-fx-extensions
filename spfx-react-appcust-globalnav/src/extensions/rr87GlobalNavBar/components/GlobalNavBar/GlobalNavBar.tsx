import * as React from 'react';
import styles from '../../Rr87GlobalNavBarApplicationCustomizer.module.scss';
import { IGlobalNavBarProps } from './IGlobalNavBarProps';
import { IGlobalNavBarState } from './IGlobalNavBarState';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';

import * as SPTermStore from '../../../../components/SPTermStoreService'; 

export default class GlobalNavBar extends React.Component<IGlobalNavBarProps, IGlobalNavBarState> {
    
       /**
       * Main constructor for the component
       */
      constructor() {
        super();
        this.state = {
        };
      }
    
      private projectMenuItem(menuItem: SPTermStore.ISPTermObject, itemType: ContextualMenuItemType) : IContextualMenuItem {
          return({
            key: menuItem.identity,
            name: menuItem.name,
            itemType: itemType,
            href: menuItem.terms.length == 0 ?
                (menuItem.localCustomProperties["_Sys_Nav_SimpleLinkUrl"] != undefined ?
                    menuItem.localCustomProperties["_Sys_Nav_SimpleLinkUrl"]
                    : null)
                : null,
            subMenuProps: menuItem.terms.length > 0 ? 
                { items : menuItem.terms.map((i) => { return(this.projectMenuItem(i, ContextualMenuItemType.Normal)); }) } 
                : null,
            isSubMenu: itemType != ContextualMenuItemType.Header,
          });
      }
    
      public render(): React.ReactElement<IGlobalNavBarProps> {
    
        const commandBarItems: IContextualMenuItem[] = this.props.menuItems.map((i) => {
            return(this.projectMenuItem(i, ContextualMenuItemType.Header));
        });
    
        return (
          <div className={`ms-bgColor-neutralLighter ms-fontColor-white ${styles.app}`}>
            <div className={`ms-bgColor-neutralLighter ms-fontColor-white ${styles.top}`}>
                <CommandBar
                className={styles.commandBar}
                isSearchBoxVisible={ false }
                elipisisAriaLabel='More options'
                items={ commandBarItems }
                />
            </div>
          </div>
        );
      }
    }
    