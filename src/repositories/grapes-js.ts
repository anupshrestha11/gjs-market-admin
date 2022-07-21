import { CreateGrapesJs, UpdateGrapesJs } from "@ts-types/generated";
import Base from "./base";

class GrapesJs extends Base<CreateGrapesJs, UpdateGrapesJs> {
  fetchParent = async (url: string) => {
    return this.http(url, "get");
  };
}

export default new GrapesJs();
