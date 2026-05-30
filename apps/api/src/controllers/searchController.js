import { ok, fail } from "../utils/response.js";
import { globalSearch } from "../services/searchService.js";

const MAX_QUERY_LENGTH = 200;
const MIN_QUERY_LENGTH = 2;

export async function search(req, res) {
  const query = (req.query.q ?? "").trim().slice(0, MAX_QUERY_LENGTH);

  if (query.length < MIN_QUERY_LENGTH) {
    return fail(res, `Query must be at least ${MIN_QUERY_LENGTH} characters`);
  }

  // Sanitize: block common injection patterns
  if (/[<>"';{}]/.test(query)) {
    return fail(res, "Query contains invalid characters");
  }

  return ok(res, await globalSearch(query));
}
