import React, {useContext} from 'react';
import MapContext from './MapContext';
import MapComponentsProvider from './MapComponentsProvider';
import {mount, configure} from 'enzyme';

const MapContextTestComponent = () => {
  const mapContext = useContext(MapContext);

  return <>
    <div className="map_count">{mapContext.mapIds.length}</div>
    <div className="typeof_map">{typeof mapContext.map}</div>
    <button className="set_anonymous_map" onClick={() => {mapContext.setMap({})}}>set anonymous map</button>
    <button className="remove_anonymous_map" onClick={() => {mapContext.removeMap()}}>set anonymous map</button>
    <div className="anonymous_map_found">{mapContext.mapExists() ? 'true':'false'}</div>
    <div className="get_anonymous_map">{mapContext.getMap() ? 'true':'false'}</div>

    <button className="register_map_1" onClick={() => {mapContext.registerMap('map_1',{id:'map_1'})}}>set map 1</button>
    <button className="remove_map_1" onClick={() => {mapContext.removeMap('map_1')}}>set map 1</button>
    <div className="map_1_found">{mapContext.mapExists('map_1') ? 'true':'false'}</div>
    <div className="map_1_id">{mapContext.mapExists('map_1') ? mapContext.getMap('map_1').id:''}</div>
    <div className="map_1_id_position_in_map_ids">{mapContext.mapIds.indexOf('map_1')}</div>

    <button className="register_map_2" onClick={() => {mapContext.registerMap('map_2',{id:'map_2'})}}>set map 2</button>
    <button className="remove_map_2" onClick={() => {mapContext.removeMap('map_2')}}>set map 2</button>
    <div className="map_2_found">{mapContext.mapExists('map_2') ? 'true':'false'}</div>
    <div className="map_2_id">{mapContext.mapExists('map_2') ? mapContext.getMap('map_2').id:''}</div>
    <div className="map_2_id_position_in_map_ids">{mapContext.mapIds.indexOf('map_2')}</div>
    </>;
}

describe('MapComponentsProvider.setMap', () => {
  it('should add an anonymous map object to mapContext',() => {

    const wrapper = mount(<MapComponentsProvider><MapContextTestComponent /></MapComponentsProvider>);

    expect(wrapper.find('.typeof_map').text()).toEqual('undefined');
    expect(wrapper.find('.map_count').text()).toEqual('0');

    wrapper.find('.set_anonymous_map').simulate('click');

    expect(wrapper.find('.typeof_map').text()).toEqual('object');
    expect(wrapper.find('.map_count').text()).toEqual('1');
  });
});

describe('MapComponentsProvider.getMap', () => {
  it('should return the map object referenced by mapContext.map if no parameters are passed',() => {

    const wrapper = mount(<MapComponentsProvider><MapContextTestComponent /></MapComponentsProvider>);

    expect(wrapper.find('.get_anonymous_map').text()).toEqual('false');

    wrapper.find('.set_anonymous_map').simulate('click');

    expect(wrapper.find('.get_anonymous_map').text()).toEqual('true');
  });
});

describe('MapComponentsProvider.mapExists', () => {
  it('should return true if an anonymous map object has been set using setMap',() => {

    const wrapper = mount(<MapComponentsProvider><MapContextTestComponent /></MapComponentsProvider>);

    expect(wrapper.find('.typeof_map').text()).toEqual('undefined');
    expect(wrapper.find('.map_count').text()).toEqual('0');
    expect(wrapper.find('.anonymous_map_found').text()).toEqual('false');

    wrapper.find('.set_anonymous_map').simulate('click');

    expect(wrapper.find('.typeof_map').text()).toEqual('object');
    expect(wrapper.find('.map_count').text()).toEqual('1');
    expect(wrapper.find('.anonymous_map_found').text()).toEqual('true');
  });

  it('should return true if a map object has been registered using registerMap',() => {

    const wrapper = mount(<MapComponentsProvider><MapContextTestComponent /></MapComponentsProvider>);

    expect(wrapper.find('.map_1_found').text()).toEqual('false');
    expect(wrapper.find('.map_1_id_position_in_map_ids').text()).toEqual('-1');
    expect(wrapper.find('.anonymous_map_found').text()).toEqual('false');

    wrapper.find('.register_map_1').simulate('click');

    expect(wrapper.find('.map_1_found').text()).toEqual('true');
    expect(wrapper.find('.map_1_id').text()).toEqual('map_1');
    expect(wrapper.find('.anonymous_map_found').text()).toEqual('true');
  });
});

describe('MapComponentsProvider.registerMap', () => {
  it('should register a map object with the id map_1 to mapContext',() => {

    const wrapper = mount(<MapComponentsProvider><MapContextTestComponent /></MapComponentsProvider>);

    expect(wrapper.find('.map_1_found').text()).toEqual('false');
    expect(wrapper.find('.map_1_id_position_in_map_ids').text()).toEqual('-1');

    wrapper.find('.register_map_1').simulate('click');

    expect(wrapper.find('.map_1_found').text()).toEqual('true');
    expect(wrapper.find('.map_1_id').text()).toEqual('map_1');
    expect(wrapper.find('.map_1_id_position_in_map_ids').text()).not.toEqual('-1');
  });

  it('should register a map object with the id map_1 and another on with the id map_2 to mapContext',() => {

    const wrapper = mount(<MapComponentsProvider><MapContextTestComponent /></MapComponentsProvider>);

    expect(wrapper.find('.map_1_found').text()).toEqual('false');
    expect(wrapper.find('.map_1_id_position_in_map_ids').text()).toEqual('-1');
    expect(wrapper.find('.map_2_found').text()).toEqual('false');
    expect(wrapper.find('.map_2_id_position_in_map_ids').text()).toEqual('-1');

    wrapper.find('.register_map_1').simulate('click');
    wrapper.find('.register_map_2').simulate('click');

    expect(wrapper.find('.map_1_found').text()).toEqual('true');
    expect(wrapper.find('.map_1_id').text()).toEqual('map_1');
    expect(wrapper.find('.map_1_id_position_in_map_ids').text()).not.toEqual('-1');
    expect(wrapper.find('.map_2_found').text()).toEqual('true');
    expect(wrapper.find('.map_2_id').text()).toEqual('map_2');
    expect(wrapper.find('.map_2_id_position_in_map_ids').text()).not.toEqual('-1');
  });
});

describe('MapComponentsProvider.removeMap', () => {

  it('should remove an anonymous map object from mapContext',() => {

    const wrapper = mount(<MapComponentsProvider><MapContextTestComponent /></MapComponentsProvider>);

    expect(wrapper.find('.typeof_map').text()).toEqual('undefined');
    expect(wrapper.find('.map_count').text()).toEqual('0');

    wrapper.find('.set_anonymous_map').simulate('click');

    expect(wrapper.find('.typeof_map').text()).toEqual('object');
    expect(wrapper.find('.map_count').text()).toEqual('1');

    wrapper.find('.remove_anonymous_map').simulate('click');

    expect(wrapper.find('.typeof_map').text()).toEqual('undefined');
    expect(wrapper.find('.map_count').text()).toEqual('0');
  });

  it('should remove a map object with the id map_1 from mapContext',() => {

    const wrapper = mount(<MapComponentsProvider><MapContextTestComponent /></MapComponentsProvider>);

    expect(wrapper.find('.map_1_found').text()).toEqual('false');
    expect(wrapper.find('.map_1_id_position_in_map_ids').text()).toEqual('-1');

    wrapper.find('.register_map_1').simulate('click');

    expect(wrapper.find('.map_1_found').text()).toEqual('true');
    expect(wrapper.find('.map_1_id').text()).toEqual('map_1');
    expect(wrapper.find('.map_1_id_position_in_map_ids').text()).not.toEqual('-1');

    wrapper.find('.remove_map_1').simulate('click');

    expect(wrapper.find('.map_1_found').text()).toEqual('false');
    expect(wrapper.find('.map_1_id').text()).toEqual('');
    expect(wrapper.find('.map_1_id_position_in_map_ids').text()).toEqual('-1');
  });

  it('should remove a map object with the id map_1 and another on with the id map_2 from mapContext',() => {

    const wrapper = mount(<MapComponentsProvider><MapContextTestComponent /></MapComponentsProvider>);

    expect(wrapper.find('.map_1_found').text()).toEqual('false');
    expect(wrapper.find('.map_1_id_position_in_map_ids').text()).toEqual('-1');
    expect(wrapper.find('.map_2_found').text()).toEqual('false');
    expect(wrapper.find('.map_2_id_position_in_map_ids').text()).toEqual('-1');

    wrapper.find('.register_map_1').simulate('click');
    wrapper.find('.register_map_2').simulate('click');

    expect(wrapper.find('.map_1_found').text()).toEqual('true');
    expect(wrapper.find('.map_1_id').text()).toEqual('map_1');
    expect(wrapper.find('.map_1_id_position_in_map_ids').text()).not.toEqual('-1');
    expect(wrapper.find('.map_2_found').text()).toEqual('true');
    expect(wrapper.find('.map_2_id').text()).toEqual('map_2');
    expect(wrapper.find('.map_2_id_position_in_map_ids').text()).not.toEqual('-1');

    wrapper.find('.remove_map_1').simulate('click');
    wrapper.find('.remove_map_2').simulate('click');

    expect(wrapper.find('.map_1_found').text()).toEqual('false');
    expect(wrapper.find('.map_1_id').text()).toEqual('');
    expect(wrapper.find('.map_1_id_position_in_map_ids').text()).toEqual('-1');
    expect(wrapper.find('.map_2_found').text()).toEqual('false');
    expect(wrapper.find('.map_2_id').text()).toEqual('');
    expect(wrapper.find('.map_2_id_position_in_map_ids').text()).toEqual('-1');
  });
});

