import selectionIcons from "../icons/selection.json";
import _get from 'lodash-es/get'

export const ICON_LIST = selectionIcons.icons.map(item => _get(item, ['properties', 'name'])).filter(item => !!item)
