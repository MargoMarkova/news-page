import { IAPI } from "./api";
import { FakeAPI } from "./fakeApi";

let _api: IAPI;

export function api(): IAPI {
  if (!_api) {
    _api = new FakeAPI();
  }
  return _api;
}
