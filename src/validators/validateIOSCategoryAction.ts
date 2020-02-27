import { IOSNotificationCategoryAction } from '..';
import { hasOwnProperty, isBoolean, isObject, isString, isUndefined } from '../utils';
import validateIOSInput from './validateIOSInput';

export default function validateIOSCategoryAction(
  action: IOSNotificationCategoryAction,
): IOSNotificationCategoryAction {
  if (!isObject(action)) {
    throw new Error('"action" expected an object value');
  }

  if (!isString(action.id) || action.id.length === 0) {
    throw new Error('"action.id" expected a valid string value.');
  }

  if (!isString(action.title) || action.title.length === 0) {
    throw new Error('"action.title" expected a valid string value.');
  }

  const out: IOSNotificationCategoryAction = {
    id: action.id,
    title: action.title,
    destructive: false,
    foreground: false,
    authenticationRequired: false,
  };

  if (hasOwnProperty(action, 'input') && !isUndefined(action.input)) {
    if (isBoolean(action.input) && action.input) {
      out.input = validateIOSInput();
    } else {
      try {
        out.input = validateIOSInput(action.input);
      } catch (e) {
        throw new Error(`'action' ${e.message}.`);
      }
    }
  }

  if (hasOwnProperty(action, 'destructive')) {
    if (!isBoolean(action.destructive)) {
      throw new Error("'destructive' expected a boolean value.");
    }

    out.destructive = action.destructive;
  }

  if (hasOwnProperty(action, 'foreground')) {
    if (!isBoolean(action.foreground)) {
      throw new Error("'foreground' expected a boolean value.");
    }

    out.foreground = action.foreground;
  }

  if (hasOwnProperty(action, 'authenticationRequired')) {
    if (!isBoolean(action.authenticationRequired)) {
      throw new Error("'authenticationRequired' expected a boolean value.");
    }

    out.authenticationRequired = action.authenticationRequired;
  }

  return out;
}
