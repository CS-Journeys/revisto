import { parse } from 'csv-parse/sync'; 
import { readFileSync } from 'fs';

const USER_TYPES = ["guest", "normal-user", "admin"];

class PermissionsManager {

  static permissions = {};

  static config() {
    USER_TYPES.forEach(userType => {
      const content = readFileSync("./auth/permissions/config/" + userType + ".csv").toString();
      const records = parse(content, {
        columns: true
      });

      let userPermissions = {};
      records.forEach(record => {
        let route = record.route;
        delete record.route;
        userPermissions[route] = record;
      })
      this.permissions[userType] = userPermissions;
    })
  }

  static checkPermissions(req, res, next) {
    let route = req.route;
    let userType = req.user.userType;
    let method = req.method;

    let isAllowed = false;

    // Determine if the request is allowed
    let userPermissions = PermissionsManager.permissions[userType];
    if (!userPermissions) {
      console.error(`ERROR: Please define permissions for ${userType}`);
    } else if (!userPermissions[route]) {
      console.error(`ERROR: Please define permissions for ${userType, route}`);
    } else if (!userPermissions[route][method]) {
      console.error(`ERROR: Please define permission for ${userType, route, method}`);
    } else if (userPermissions[route][method] == "yes") {
      isAllowed = true;
    } else if (userPermissions[route][method] == "if_own") {
      isAllowed = true;
      req.ifOwn = true;
    }

    if (isAllowed) {
      next();
    } else {
      res.status(403).json({ err: "FORBIDDEN" });
    }
  }
}

PermissionsManager.config();

export default PermissionsManager.checkPermissions;