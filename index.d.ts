/* eslint-disable */

interface Window {
  /**
   * APIs available for Rulia plugins.
   */
  Rulia: {
    /**
     * Write a log message.
     * This function is available from 0.18.0.
     */
    log: (level: string, message: string) => void

    /**
     * End execution of current plugin context without returning any data.
     */
    end: () => void

    /**
     * End execution of current plugin context with some data returned.
     *
     * @param payload Data passed to Rulia.
     */
    endWithResult: (payload: any) => void

    /**
     * End execution of current plugin context with raising an exception.
     *
     * @param errorMsg Error message.
     */
    endWithException: (errorMsg: string) => void

    /**
     * Make an app toast.
     * You can use this function to tell user something if you need to.
     *
     * @param message Toast message.
     */
    appToast: (message: string) => void

    /**
     * Make a http request.
     *
     * @example
     * // 1. Make a get request.
     * // ===========================================
     * const payload = new URLSearchParams()
     * payload.append('region', 'japan')
     * payload.append('keyword', 'school')
     *
     * const rawResponse = await window.Rulia.httpRequest({
     *   url: 'https://example.com/v1/comic-list',
     *   method: 'GET',
     *   payload: payload.toString()  // 'region=japan&keyword=school'
     * })
     *
     * // If the response is JSON.
     * const response = JSON.parse(rawResponse)
     * 
     * @example
     * // 1.5 Make a get request and get both headers and response.
     * // ===========================================
     * const payload = new URLSearchParams()
     * payload.append('region', 'japan')
     * payload.append('keyword', 'school')
     * 
     * const rawResponse = await window.Rulia.httpRequest({
     *   url: 'https://example.com/v1/comic-list',
     *   method: 'GET',
     *   payload: payload.toString(),  // 'region=japan&keyword=school'
     *   responseWithHeaders: true     // Be aware of this.
     * })
     * 
     * const { data, headers } = JSON.parse(rawResponse)
     * console.log(headers)  // { 'content-type': 'application/json', ... }
     * 
     * // If the response is JSON.
     * const response = JSON.parse(data)
     *
     * @example
     * // 2. Make a post request in the form of the "application/json".
     * // ===========================================
     * const payload = {
     *   name: 'John Smith',
     *   age: 100
     * }
     * const rawResponse = await window.Rulia.httpRequest({
     *   url: 'https://example.com/v1/add-user',
     *   method: 'POST',
     *   payload: JSON.stringify(payload),
     *   contentType: 'application/json'
     * })
     *
     * // If your response is some kind of customized string, just use it.
     * const response = rawResponse
     *
     * @example
     * // 3. Make a post request in the form of the "application/x-www-form-urlencoded".
     * // ===========================================
     * const payload = new URLSearchParams()
     * payload.append('name', 'John Smith')
     * payload.append('age', 100)
     *
     * const rawResposne = await window.Rulia.httpRequest({
     *   url: 'https://example.com/v1/add-user',
     *   method: 'POST',
     *   payload: payload.toString(),
     *   contentType: 'application/x-www-form-urlencoded'
     * })
     *
     * @example
     * // 4. Make a post request with your custom type.
     * // ===========================================
     * const rawResponse = await window.Rulia.httpRequest({
     *   url: 'https://example.com/some/api/requires/xml',
     *   method: 'POST',
     *   payload: '<user><name>John Smith</name><age>100</age></user>',  // Let's say the server requires a piece of XML.
     *   contentType: 'application/must-be-written-in-this-way'  // The required content type by the server.
     * })
     *
     * // For an example, the sever responses a YAML string.
     * const myYAML = parseYAML(rawResponse)
     */
    httpRequest: (params: {
      /**
       * Request URL.
       */
      url: string

      /**
       * Http method.
       */
      method: string

      /**
       * Requested data.
       * It only accepts string, thus you have to serialize it into string by yourself.
       * Check the example above to see how to do this.
       */
      payload?: string

      /**
       * Content type of the request.
       * It should be somthing that the server asks for.
       */
      contentType?: string

      /**
       * Timeout for the request. Milliseconds.
       * No default setting.
       * This parameter is available from 0.15.0.
       */
      timeout?: number

      /**
       * Custom headers.
       * This option is available from 0.17.0.
       */
      headers?: Record<string, string>

      /**
       * Whether to response with headers.
       * If this option is set to true, the response will be a JSON string with two fields: "headers" and "data".
       * If this option is set to false, the response will be the data itself.
       * 
       * This option is available from 0.18.0.
       * 
       * @example If the server responses a JSON { name: 'Doge' }.
       * 
       * const rawResponse = await window.Rulia.httpRequest({ ... })
       * const data = JSON.parse(rawResponse)  // { name: 'Doge' }
       * 
       * const rawResponse = await window.Rulia.httpRequest({ ..., responseWithHeaders: true })
       * const response = JSON.parse(rawResponse)  // { data: '{ "nane": "Doge" }', headers: { 'content-type': 'application/json', ... }
       * const data = JSON.parse(response.data)  // { name: 'Doge' }
       * const headers = response.headers  // { 'content-type': 'application/json', ... }
       * 
       * @example If the server responses a piece of XML: '<user><name>Doge</name></user>'
       * 
       * const data = await window.Rulia.httpRequest({ ... })  // '<user><name>Doge</name></user>'
       * 
       * const rawResponse = await window.Rulia.httpRequest({ ..., responseWithHeaders: true })
       * const response = JSON.parse(rawResponse)  // { data: '<user><name>Doge</name></user>', headers: { 'content-type': 'application/xml', ... }
       * const data = response.data  // '<user><name>Doge</name></user>'
       * const headers = response.headers  // { 'content-type': 'application/xml', ... }
       */
      responseWithHeaders?: boolean
    }) => Promise<string>

    /**
     * Get app version. Maybe you need it.
     *
     * @returns {string} Version string.
     */
    getAppVersion: () => string

    /**
     * Get user config of the plugin.
     * User config fields are defined in the section "userConfig" in the package.json.
     */
    getUserConfig: () => Record<string, string>

    /**
     * This local storage API just acts exactly as the same as the one in browsers.
     * The data will be persisted in Rulia.
     * Available from 0.15.0.
     */
    localStorage: {
      getItem: (key: string) => string | undefined
      setItem: (key: string, value: string) => void
    },

    /**
     * This session storage API just acts exactly the same as the one in browser.
     * Your data will be lost after users close the Rulia.
     * Available from 0.15.0.
     */
    sessionStorage: {
      getItem: (key: string) => string | undefined
      setItem: (key: string, value: string) => void
    },

    /**
     * Get all cookies from Rulia.
     * These cookies are available after the user logs in through WebView.
     * This function is available from 0.18.0.
     */
    getCookies: () => Promise<{
      Name: string
      Path: string
      Domain: string
      Value: string
      Expires: string
      HttpOnly: boolean
      Secure: boolean
    }[]>
  }
}

/**
 * This is the data type that you need to pass to Rulia
 * in function "getMangaList".
 */
interface IGetMangaListResult {
  list: {
    title: string
    url: string
    coverUrl: string
  }[]
}

/**
 * This is the data type that you need to pass to Rulia
 * in function "getMangaData".
 */
interface IGetMangaDataResult {
  title: string
  description: string
  coverUrl: string

  /**
   * Chapter list.
   * If you need to make a pagination, assign "chapterListTotalPage" and
   * leave "chapterList" an empty array.
   */
  chapterList: {
    title: string
    url: string
  }[]

  /**
   * If this field is provided, the app will make a pagination
   * for the chapter list.
   * You only need to provide either "chapterListTotalPage" or "chapterList".
   *
   * Available from 0.22.0.
   */
  chapterListTotalPage?: number

  /**
   * There will be a continue button if you provide this information.
   */
  lastReadChapter?: {
    title: string
    url: string
  }
}

/**
 * This is the image data for each single image.
 */
interface IRuliaChapterImage {
  url: string
  width: number
  height: number
}

/**
 * This is the type of filter options in manga list page.
 */
interface IRuliaMangaListFilterOption {
  label: string
  name: string | number
  options: Array<{ label: string, value: string }>
}

/**
 * This is the data type that should be returned in function "setMangaListFilterOptions".
 */
type IRuliaMangaListFilterOptions = IRuliaMangaListFilterOption[]
