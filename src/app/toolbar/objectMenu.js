import { useCallback } from 'react';
import './objectMenu.css';
import menuConfig from './objectMenu.json';
import objects from '@/app/objects';

const ObjectMenu = ({visible, onObjectSelected}) => {

    const onActorButtonClicked = useCallback((event, objectId) => {
        onObjectSelected && onObjectSelected({objectId});
    }, []);

    return (
        <div style={{display:visible?'':'none'}} className={"objectsMenu"}>
          {
            menuConfig.map(section => (
                <div key={section.title} className={"objectsMenuSection"}>
                  <div>{section.title}</div>
                  <div>
                    {section.objects.map(obj => {
                      const Object = objects[obj.id];
                      if (!Object) {
                        //console.warn(`No object definition found for object menu item ${obj.id}. Verify that a component exists in the objects folder by that name.`);
                        return;
                      }
                      return (
                          <div key={obj.id} className={"objectsMenuItem"} onClick={event=>onActorButtonClicked(event, obj.id)}>
                            <Object mode={"icon"} label={obj.label} />
                          </div>
                      );
                    })}
                  </div>
                </div>
            ))
          }
            {/*<div>Actors</div>*/}
            {/*<button onClick={onActorButtonClicked} data-objecttype={'customer'}>Customer</button>*/}
            {/*<button onClick={onActorButtonClicked} data-objecttype={'merchant'}>Merchant</button>*/}
            {/*<div>Systems</div>*/}
            {/*<button>Apps</button>*/}
            {/*<button>Domains</button>*/}
        </div>
    );
}

export default ObjectMenu;