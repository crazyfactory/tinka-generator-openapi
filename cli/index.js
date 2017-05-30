#!/usr/bin/env node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var HttpMethod;
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["POST"] = 1] = "POST";
    HttpMethod[HttpMethod["PUT"] = 2] = "PUT";
    HttpMethod[HttpMethod["DELETE"] = 3] = "DELETE";
    HttpMethod[HttpMethod["PATCH"] = 4] = "PATCH";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

String.prototype.toCamelCase = function () {
    var str = this;
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+|-)/g, function (match, index) {
        if (/(\s+|_|-)/.test(match)) return "";
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
    }).replace(/_+\w/g, function (match) {
        return match[match.length - 1].toUpperCase();
    });
};
String.prototype.toPascalCase = function () {
    var str = this;
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+|-)/g, function (match, index) {
        if (/(\s+|_|-)/.test(match)) return "";
        return match.toUpperCase();
    }).replace(/_+\w/g, function (match) {
        return match[match.length - 1].toUpperCase();
    });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __webpack_require__(0);
var BaseGenerator_1 = __webpack_require__(6);
var InterfaceGenerator_1 = __webpack_require__(9);
var TsControllerGenerator_1 = __webpack_require__(10);
var TypeScriptGenerator = function (_super) {
    __extends(TypeScriptGenerator, _super);
    function TypeScriptGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypeScriptGenerator.prototype.bundle = function () {
        // we don't need to bundle it, package.json will be present on sdk consumer repo
        return;
    };
    TypeScriptGenerator.prototype.generate = function () {
        var interfaceString = this.generateModels();
        var controllersString = this.generateApis();
        var sdk_stub = TypeScriptGenerator.getSdkStub();
        var sdk = sdk_stub.replace("{SDK_BODY}", interfaceString + controllersString);
        fs.writeFileSync("sdk/TypeScript/src/sdk.ts", sdk);
        this.bundle();
        console.log("Sdk generated, you can now `run npm install && npm run build && npm publish`");
    };
    TypeScriptGenerator.prototype.generateModels = function () {
        var generator = new InterfaceGenerator_1.InterfaceGenerator(this.apiData);
        return generator.generate();
    };
    TypeScriptGenerator.prototype.generateApis = function () {
        var tsGenerator = new TsControllerGenerator_1.TsControllerGenerator(this.apiControllers);
        return tsGenerator.generateString();
    };
    TypeScriptGenerator.getSdkStub = function () {
        return 'import {IFetchRequest, Service} from "@crazyfactory/tinka";\n{SDK_BODY}';
    };
    return TypeScriptGenerator;
}(BaseGenerator_1.BaseGenerator);
exports.TypeScriptGenerator = TypeScriptGenerator;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var EventEmitter = __webpack_require__(15).EventEmitter;
var spawn = __webpack_require__(14).spawn;
var readlink = __webpack_require__(13).readlinkSync;
var path = __webpack_require__(2);
var dirname = path.dirname;
var basename = path.basename;
var fs = __webpack_require__(0);

/**
 * Expose the root command.
 */

exports = module.exports = new Command();

/**
 * Expose `Command`.
 */

exports.Command = Command;

/**
 * Expose `Option`.
 */

exports.Option = Option;

/**
 * Initialize a new `Option` with the given `flags` and `description`.
 *
 * @param {String} flags
 * @param {String} description
 * @api public
 */

function Option(flags, description) {
  this.flags = flags;
  this.required = ~flags.indexOf('<');
  this.optional = ~flags.indexOf('[');
  this.bool = !~flags.indexOf('-no-');
  flags = flags.split(/[ ,|]+/);
  if (flags.length > 1 && !/^[[<]/.test(flags[1])) this.short = flags.shift();
  this.long = flags.shift();
  this.description = description || '';
}

/**
 * Return option name.
 *
 * @return {String}
 * @api private
 */

Option.prototype.name = function() {
  return this.long
    .replace('--', '')
    .replace('no-', '');
};

/**
 * Check if `arg` matches the short or long flag.
 *
 * @param {String} arg
 * @return {Boolean}
 * @api private
 */

Option.prototype.is = function(arg) {
  return arg == this.short || arg == this.long;
};

/**
 * Initialize a new `Command`.
 *
 * @param {String} name
 * @api public
 */

function Command(name) {
  this.commands = [];
  this.options = [];
  this._execs = {};
  this._allowUnknownOption = false;
  this._args = [];
  this._name = name || '';
}

/**
 * Inherit from `EventEmitter.prototype`.
 */

Command.prototype.__proto__ = EventEmitter.prototype;

/**
 * Add command `name`.
 *
 * The `.action()` callback is invoked when the
 * command `name` is specified via __ARGV__,
 * and the remaining arguments are applied to the
 * function for access.
 *
 * When the `name` is "*" an un-matched command
 * will be passed as the first arg, followed by
 * the rest of __ARGV__ remaining.
 *
 * Examples:
 *
 *      program
 *        .version('0.0.1')
 *        .option('-C, --chdir <path>', 'change the working directory')
 *        .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
 *        .option('-T, --no-tests', 'ignore test hook')
 *
 *      program
 *        .command('setup')
 *        .description('run remote setup commands')
 *        .action(function() {
 *          console.log('setup');
 *        });
 *
 *      program
 *        .command('exec <cmd>')
 *        .description('run the given remote command')
 *        .action(function(cmd) {
 *          console.log('exec "%s"', cmd);
 *        });
 *
 *      program
 *        .command('teardown <dir> [otherDirs...]')
 *        .description('run teardown commands')
 *        .action(function(dir, otherDirs) {
 *          console.log('dir "%s"', dir);
 *          if (otherDirs) {
 *            otherDirs.forEach(function (oDir) {
 *              console.log('dir "%s"', oDir);
 *            });
 *          }
 *        });
 *
 *      program
 *        .command('*')
 *        .description('deploy the given env')
 *        .action(function(env) {
 *          console.log('deploying "%s"', env);
 *        });
 *
 *      program.parse(process.argv);
  *
 * @param {String} name
 * @param {String} [desc] for git-style sub-commands
 * @return {Command} the new command
 * @api public
 */

Command.prototype.command = function(name, desc, opts) {
  opts = opts || {};
  var args = name.split(/ +/);
  var cmd = new Command(args.shift());

  if (desc) {
    cmd.description(desc);
    this.executables = true;
    this._execs[cmd._name] = true;
    if (opts.isDefault) this.defaultExecutable = cmd._name;
  }

  cmd._noHelp = !!opts.noHelp;
  this.commands.push(cmd);
  cmd.parseExpectedArgs(args);
  cmd.parent = this;

  if (desc) return this;
  return cmd;
};

/**
 * Define argument syntax for the top-level command.
 *
 * @api public
 */

Command.prototype.arguments = function (desc) {
  return this.parseExpectedArgs(desc.split(/ +/));
};

/**
 * Add an implicit `help [cmd]` subcommand
 * which invokes `--help` for the given command.
 *
 * @api private
 */

Command.prototype.addImplicitHelpCommand = function() {
  this.command('help [cmd]', 'display help for [cmd]');
};

/**
 * Parse expected `args`.
 *
 * For example `["[type]"]` becomes `[{ required: false, name: 'type' }]`.
 *
 * @param {Array} args
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.parseExpectedArgs = function(args) {
  if (!args.length) return;
  var self = this;
  args.forEach(function(arg) {
    var argDetails = {
      required: false,
      name: '',
      variadic: false
    };

    switch (arg[0]) {
      case '<':
        argDetails.required = true;
        argDetails.name = arg.slice(1, -1);
        break;
      case '[':
        argDetails.name = arg.slice(1, -1);
        break;
    }

    if (argDetails.name.length > 3 && argDetails.name.slice(-3) === '...') {
      argDetails.variadic = true;
      argDetails.name = argDetails.name.slice(0, -3);
    }
    if (argDetails.name) {
      self._args.push(argDetails);
    }
  });
  return this;
};

/**
 * Register callback `fn` for the command.
 *
 * Examples:
 *
 *      program
 *        .command('help')
 *        .description('display verbose help')
 *        .action(function() {
 *           // output help here
 *        });
 *
 * @param {Function} fn
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.action = function(fn) {
  var self = this;
  var listener = function(args, unknown) {
    // Parse any so-far unknown options
    args = args || [];
    unknown = unknown || [];

    var parsed = self.parseOptions(unknown);

    // Output help if necessary
    outputHelpIfNecessary(self, parsed.unknown);

    // If there are still any unknown options, then we simply
    // die, unless someone asked for help, in which case we give it
    // to them, and then we die.
    if (parsed.unknown.length > 0) {
      self.unknownOption(parsed.unknown[0]);
    }

    // Leftover arguments need to be pushed back. Fixes issue #56
    if (parsed.args.length) args = parsed.args.concat(args);

    self._args.forEach(function(arg, i) {
      if (arg.required && null == args[i]) {
        self.missingArgument(arg.name);
      } else if (arg.variadic) {
        if (i !== self._args.length - 1) {
          self.variadicArgNotLast(arg.name);
        }

        args[i] = args.splice(i);
      }
    });

    // Always append ourselves to the end of the arguments,
    // to make sure we match the number of arguments the user
    // expects
    if (self._args.length) {
      args[self._args.length] = self;
    } else {
      args.push(self);
    }

    fn.apply(self, args);
  };
  var parent = this.parent || this;
  var name = parent === this ? '*' : this._name;
  parent.on(name, listener);
  if (this._alias) parent.on(this._alias, listener);
  return this;
};

/**
 * Define option with `flags`, `description` and optional
 * coercion `fn`.
 *
 * The `flags` string should contain both the short and long flags,
 * separated by comma, a pipe or space. The following are all valid
 * all will output this way when `--help` is used.
 *
 *    "-p, --pepper"
 *    "-p|--pepper"
 *    "-p --pepper"
 *
 * Examples:
 *
 *     // simple boolean defaulting to false
 *     program.option('-p, --pepper', 'add pepper');
 *
 *     --pepper
 *     program.pepper
 *     // => Boolean
 *
 *     // simple boolean defaulting to true
 *     program.option('-C, --no-cheese', 'remove cheese');
 *
 *     program.cheese
 *     // => true
 *
 *     --no-cheese
 *     program.cheese
 *     // => false
 *
 *     // required argument
 *     program.option('-C, --chdir <path>', 'change the working directory');
 *
 *     --chdir /tmp
 *     program.chdir
 *     // => "/tmp"
 *
 *     // optional argument
 *     program.option('-c, --cheese [type]', 'add cheese [marble]');
 *
 * @param {String} flags
 * @param {String} description
 * @param {Function|Mixed} fn or default
 * @param {Mixed} defaultValue
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.option = function(flags, description, fn, defaultValue) {
  var self = this
    , option = new Option(flags, description)
    , oname = option.name()
    , name = camelcase(oname);

  // default as 3rd arg
  if (typeof fn != 'function') {
    if (fn instanceof RegExp) {
      var regex = fn;
      fn = function(val, def) {
        var m = regex.exec(val);
        return m ? m[0] : def;
      }
    }
    else {
      defaultValue = fn;
      fn = null;
    }
  }

  // preassign default value only for --no-*, [optional], or <required>
  if (false == option.bool || option.optional || option.required) {
    // when --no-* we make sure default is true
    if (false == option.bool) defaultValue = true;
    // preassign only if we have a default
    if (undefined !== defaultValue) self[name] = defaultValue;
  }

  // register the option
  this.options.push(option);

  // when it's passed assign the value
  // and conditionally invoke the callback
  this.on(oname, function(val) {
    // coercion
    if (null !== val && fn) val = fn(val, undefined === self[name]
      ? defaultValue
      : self[name]);

    // unassigned or bool
    if ('boolean' == typeof self[name] || 'undefined' == typeof self[name]) {
      // if no value, bool true, and we have a default, then use it!
      if (null == val) {
        self[name] = option.bool
          ? defaultValue || true
          : false;
      } else {
        self[name] = val;
      }
    } else if (null !== val) {
      // reassign
      self[name] = val;
    }
  });

  return this;
};

/**
 * Allow unknown options on the command line.
 *
 * @param {Boolean} arg if `true` or omitted, no error will be thrown
 * for unknown options.
 * @api public
 */
Command.prototype.allowUnknownOption = function(arg) {
    this._allowUnknownOption = arguments.length === 0 || arg;
    return this;
};

/**
 * Parse `argv`, settings options and invoking commands when defined.
 *
 * @param {Array} argv
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.parse = function(argv) {
  // implicit help
  if (this.executables) this.addImplicitHelpCommand();

  // store raw args
  this.rawArgs = argv;

  // guess name
  this._name = this._name || basename(argv[1], '.js');

  // github-style sub-commands with no sub-command
  if (this.executables && argv.length < 3 && !this.defaultExecutable) {
    // this user needs help
    argv.push('--help');
  }

  // process argv
  var parsed = this.parseOptions(this.normalize(argv.slice(2)));
  var args = this.args = parsed.args;

  var result = this.parseArgs(this.args, parsed.unknown);

  // executable sub-commands
  var name = result.args[0];
  if (this._execs[name] && typeof this._execs[name] != "function") {
    return this.executeSubCommand(argv, args, parsed.unknown);
  } else if (this.defaultExecutable) {
    // use the default subcommand
    args.unshift(name = this.defaultExecutable);
    return this.executeSubCommand(argv, args, parsed.unknown);
  }

  return result;
};

/**
 * Execute a sub-command executable.
 *
 * @param {Array} argv
 * @param {Array} args
 * @param {Array} unknown
 * @api private
 */

Command.prototype.executeSubCommand = function(argv, args, unknown) {
  args = args.concat(unknown);

  if (!args.length) this.help();
  if ('help' == args[0] && 1 == args.length) this.help();

  // <cmd> --help
  if ('help' == args[0]) {
    args[0] = args[1];
    args[1] = '--help';
  }

  // executable
  var f = argv[1];
  // name of the subcommand, link `pm-install`
  var bin = basename(f, '.js') + '-' + args[0];


  // In case of globally installed, get the base dir where executable
  //  subcommand file should be located at
  var baseDir
    , link = readlink(f);

  // when symbolink is relative path
  if (link !== f && link.charAt(0) !== '/') {
    link = path.join(dirname(f), link)
  }
  baseDir = dirname(link);

  // prefer local `./<bin>` to bin in the $PATH
  var localBin = path.join(baseDir, bin);

  // whether bin file is a js script with explicit `.js` extension
  var isExplicitJS = false;
  if (exists(localBin + '.js')) {
    bin = localBin + '.js';
    isExplicitJS = true;
  } else if (exists(localBin)) {
    bin = localBin;
  }

  args = args.slice(1);

  var proc;
  if (process.platform !== 'win32') {
    if (isExplicitJS) {
      args.unshift(localBin);
      // add executable arguments to spawn
      args = (process.execArgv || []).concat(args);

      proc = spawn('node', args, { stdio: 'inherit', customFds: [0, 1, 2] });
    } else {
      proc = spawn(bin, args, { stdio: 'inherit', customFds: [0, 1, 2] });
    }
  } else {
    args.unshift(localBin);
    proc = spawn(process.execPath, args, { stdio: 'inherit'});
  }

  proc.on('close', process.exit.bind(process));
  proc.on('error', function(err) {
    if (err.code == "ENOENT") {
      console.error('\n  %s(1) does not exist, try --help\n', bin);
    } else if (err.code == "EACCES") {
      console.error('\n  %s(1) not executable. try chmod or run with root\n', bin);
    }
    process.exit(1);
  });

  // Store the reference to the child process
  this.runningCommand = proc;
};

/**
 * Normalize `args`, splitting joined short flags. For example
 * the arg "-abc" is equivalent to "-a -b -c".
 * This also normalizes equal sign and splits "--abc=def" into "--abc def".
 *
 * @param {Array} args
 * @return {Array}
 * @api private
 */

Command.prototype.normalize = function(args) {
  var ret = []
    , arg
    , lastOpt
    , index;

  for (var i = 0, len = args.length; i < len; ++i) {
    arg = args[i];
    if (i > 0) {
      lastOpt = this.optionFor(args[i-1]);
    }

    if (arg === '--') {
      // Honor option terminator
      ret = ret.concat(args.slice(i));
      break;
    } else if (lastOpt && lastOpt.required) {
      ret.push(arg);
    } else if (arg.length > 1 && '-' == arg[0] && '-' != arg[1]) {
      arg.slice(1).split('').forEach(function(c) {
        ret.push('-' + c);
      });
    } else if (/^--/.test(arg) && ~(index = arg.indexOf('='))) {
      ret.push(arg.slice(0, index), arg.slice(index + 1));
    } else {
      ret.push(arg);
    }
  }

  return ret;
};

/**
 * Parse command `args`.
 *
 * When listener(s) are available those
 * callbacks are invoked, otherwise the "*"
 * event is emitted and those actions are invoked.
 *
 * @param {Array} args
 * @return {Command} for chaining
 * @api private
 */

Command.prototype.parseArgs = function(args, unknown) {
  var name;

  if (args.length) {
    name = args[0];
    if (this.listeners(name).length) {
      this.emit(args.shift(), args, unknown);
    } else {
      this.emit('*', args);
    }
  } else {
    outputHelpIfNecessary(this, unknown);

    // If there were no args and we have unknown options,
    // then they are extraneous and we need to error.
    if (unknown.length > 0) {
      this.unknownOption(unknown[0]);
    }
  }

  return this;
};

/**
 * Return an option matching `arg` if any.
 *
 * @param {String} arg
 * @return {Option}
 * @api private
 */

Command.prototype.optionFor = function(arg) {
  for (var i = 0, len = this.options.length; i < len; ++i) {
    if (this.options[i].is(arg)) {
      return this.options[i];
    }
  }
};

/**
 * Parse options from `argv` returning `argv`
 * void of these options.
 *
 * @param {Array} argv
 * @return {Array}
 * @api public
 */

Command.prototype.parseOptions = function(argv) {
  var args = []
    , len = argv.length
    , literal
    , option
    , arg;

  var unknownOptions = [];

  // parse options
  for (var i = 0; i < len; ++i) {
    arg = argv[i];

    // literal args after --
    if ('--' == arg) {
      literal = true;
      continue;
    }

    if (literal) {
      args.push(arg);
      continue;
    }

    // find matching Option
    option = this.optionFor(arg);

    // option is defined
    if (option) {
      // requires arg
      if (option.required) {
        arg = argv[++i];
        if (null == arg) return this.optionMissingArgument(option);
        this.emit(option.name(), arg);
      // optional arg
      } else if (option.optional) {
        arg = argv[i+1];
        if (null == arg || ('-' == arg[0] && '-' != arg)) {
          arg = null;
        } else {
          ++i;
        }
        this.emit(option.name(), arg);
      // bool
      } else {
        this.emit(option.name());
      }
      continue;
    }

    // looks like an option
    if (arg.length > 1 && '-' == arg[0]) {
      unknownOptions.push(arg);

      // If the next argument looks like it might be
      // an argument for this option, we pass it on.
      // If it isn't, then it'll simply be ignored
      if (argv[i+1] && '-' != argv[i+1][0]) {
        unknownOptions.push(argv[++i]);
      }
      continue;
    }

    // arg
    args.push(arg);
  }

  return { args: args, unknown: unknownOptions };
};

/**
 * Return an object containing options as key-value pairs
 *
 * @return {Object}
 * @api public
 */
Command.prototype.opts = function() {
  var result = {}
    , len = this.options.length;

  for (var i = 0 ; i < len; i++) {
    var key = camelcase(this.options[i].name());
    result[key] = key === 'version' ? this._version : this[key];
  }
  return result;
};

/**
 * Argument `name` is missing.
 *
 * @param {String} name
 * @api private
 */

Command.prototype.missingArgument = function(name) {
  console.error();
  console.error("  error: missing required argument `%s'", name);
  console.error();
  process.exit(1);
};

/**
 * `Option` is missing an argument, but received `flag` or nothing.
 *
 * @param {String} option
 * @param {String} flag
 * @api private
 */

Command.prototype.optionMissingArgument = function(option, flag) {
  console.error();
  if (flag) {
    console.error("  error: option `%s' argument missing, got `%s'", option.flags, flag);
  } else {
    console.error("  error: option `%s' argument missing", option.flags);
  }
  console.error();
  process.exit(1);
};

/**
 * Unknown option `flag`.
 *
 * @param {String} flag
 * @api private
 */

Command.prototype.unknownOption = function(flag) {
  if (this._allowUnknownOption) return;
  console.error();
  console.error("  error: unknown option `%s'", flag);
  console.error();
  process.exit(1);
};

/**
 * Variadic argument with `name` is not the last argument as required.
 *
 * @param {String} name
 * @api private
 */

Command.prototype.variadicArgNotLast = function(name) {
  console.error();
  console.error("  error: variadic arguments must be last `%s'", name);
  console.error();
  process.exit(1);
};

/**
 * Set the program version to `str`.
 *
 * This method auto-registers the "-V, --version" flag
 * which will print the version number when passed.
 *
 * @param {String} str
 * @param {String} flags
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.version = function(str, flags) {
  if (0 == arguments.length) return this._version;
  this._version = str;
  flags = flags || '-V, --version';
  this.option(flags, 'output the version number');
  this.on('version', function() {
    process.stdout.write(str + '\n');
    process.exit(0);
  });
  return this;
};

/**
 * Set the description to `str`.
 *
 * @param {String} str
 * @return {String|Command}
 * @api public
 */

Command.prototype.description = function(str) {
  if (0 === arguments.length) return this._description;
  this._description = str;
  return this;
};

/**
 * Set an alias for the command
 *
 * @param {String} alias
 * @return {String|Command}
 * @api public
 */

Command.prototype.alias = function(alias) {
  if (0 == arguments.length) return this._alias;
  this._alias = alias;
  return this;
};

/**
 * Set / get the command usage `str`.
 *
 * @param {String} str
 * @return {String|Command}
 * @api public
 */

Command.prototype.usage = function(str) {
  var args = this._args.map(function(arg) {
    return humanReadableArgName(arg);
  });

  var usage = '[options]'
    + (this.commands.length ? ' [command]' : '')
    + (this._args.length ? ' ' + args.join(' ') : '');

  if (0 == arguments.length) return this._usage || usage;
  this._usage = str;

  return this;
};

/**
 * Get the name of the command
 *
 * @param {String} name
 * @return {String|Command}
 * @api public
 */

Command.prototype.name = function() {
  return this._name;
};

/**
 * Return the largest option length.
 *
 * @return {Number}
 * @api private
 */

Command.prototype.largestOptionLength = function() {
  return this.options.reduce(function(max, option) {
    return Math.max(max, option.flags.length);
  }, 0);
};

/**
 * Return help for options.
 *
 * @return {String}
 * @api private
 */

Command.prototype.optionHelp = function() {
  var width = this.largestOptionLength();

  // Prepend the help information
  return [pad('-h, --help', width) + '  ' + 'output usage information']
      .concat(this.options.map(function(option) {
        return pad(option.flags, width) + '  ' + option.description;
      }))
      .join('\n');
};

/**
 * Return command help documentation.
 *
 * @return {String}
 * @api private
 */

Command.prototype.commandHelp = function() {
  if (!this.commands.length) return '';

  var commands = this.commands.filter(function(cmd) {
    return !cmd._noHelp;
  }).map(function(cmd) {
    var args = cmd._args.map(function(arg) {
      return humanReadableArgName(arg);
    }).join(' ');

    return [
      cmd._name
        + (cmd._alias ? '|' + cmd._alias : '')
        + (cmd.options.length ? ' [options]' : '')
        + ' ' + args
      , cmd.description()
    ];
  });

  var width = commands.reduce(function(max, command) {
    return Math.max(max, command[0].length);
  }, 0);

  return [
    ''
    , '  Commands:'
    , ''
    , commands.map(function(cmd) {
      var desc = cmd[1] ? '  ' + cmd[1] : '';
      return pad(cmd[0], width) + desc;
    }).join('\n').replace(/^/gm, '    ')
    , ''
  ].join('\n');
};

/**
 * Return program help documentation.
 *
 * @return {String}
 * @api private
 */

Command.prototype.helpInformation = function() {
  var desc = [];
  if (this._description) {
    desc = [
      '  ' + this._description
      , ''
    ];
  }

  var cmdName = this._name;
  if (this._alias) {
    cmdName = cmdName + '|' + this._alias;
  }
  var usage = [
    ''
    ,'  Usage: ' + cmdName + ' ' + this.usage()
    , ''
  ];

  var cmds = [];
  var commandHelp = this.commandHelp();
  if (commandHelp) cmds = [commandHelp];

  var options = [
    '  Options:'
    , ''
    , '' + this.optionHelp().replace(/^/gm, '    ')
    , ''
    , ''
  ];

  return usage
    .concat(cmds)
    .concat(desc)
    .concat(options)
    .join('\n');
};

/**
 * Output help information for this command
 *
 * @api public
 */

Command.prototype.outputHelp = function(cb) {
  if (!cb) {
    cb = function(passthru) {
      return passthru;
    }
  }
  process.stdout.write(cb(this.helpInformation()));
  this.emit('--help');
};

/**
 * Output help information and exit.
 *
 * @api public
 */

Command.prototype.help = function(cb) {
  this.outputHelp(cb);
  process.exit();
};

/**
 * Camel-case the given `flag`
 *
 * @param {String} flag
 * @return {String}
 * @api private
 */

function camelcase(flag) {
  return flag.split('-').reduce(function(str, word) {
    return str + word[0].toUpperCase() + word.slice(1);
  });
}

/**
 * Pad `str` to `width`.
 *
 * @param {String} str
 * @param {Number} width
 * @return {String}
 * @api private
 */

function pad(str, width) {
  var len = Math.max(0, width - str.length);
  return str + Array(len + 1).join(' ');
}

/**
 * Output help information if necessary
 *
 * @param {Command} command to output help for
 * @param {Array} array of options to search for -h or --help
 * @api private
 */

function outputHelpIfNecessary(cmd, options) {
  options = options || [];
  for (var i = 0; i < options.length; i++) {
    if (options[i] == '--help' || options[i] == '-h') {
      cmd.outputHelp();
      process.exit(0);
    }
  }
}

/**
 * Takes an argument an returns its human readable equivalent for help usage.
 *
 * @param {Object} arg
 * @return {String}
 * @api private
 */

function humanReadableArgName(arg) {
  var nameOutput = arg.name + (arg.variadic === true ? '...' : '');

  return arg.required
    ? '<' + nameOutput + '>'
    : '[' + nameOutput + ']'
}

// for versions before node v0.8 when there weren't `fs.existsSync`
function exists(file) {
  try {
    if (fs.statSync(file).isFile()) {
      return true;
    }
  } catch (e) {
    return false;
  }
}



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fs = __webpack_require__(0);
var path = __webpack_require__(2);
var GeneratorHelpers_1 = __webpack_require__(8);
var BaseGenerator = function () {
    function BaseGenerator(file) {
        var data = fs.readFileSync(path.resolve(file)).toString();
        this.apiData = JSON.parse(data);
        this.emptyApiControllers = GeneratorHelpers_1.GeneratorHelpers.getEmptyApiControllers(this.apiData.paths);
        this.apiMethods = GeneratorHelpers_1.GeneratorHelpers.getApiMethods(this.apiData.paths);
        this.apiControllers = GeneratorHelpers_1.GeneratorHelpers.getApiControllers(this.emptyApiControllers, this.apiMethods);
    }
    return BaseGenerator;
}();
exports.BaseGenerator = BaseGenerator;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Code = function () {
    function Code(firstLine) {
        this.code = firstLine;
        this.children = [];
    }
    Code.prototype.addLine = function (line) {
        this.code += "\n" + line;
    };
    Code.prototype.addChild = function (code) {
        this.children.push(code);
    };
    Code.prototype.toString = function () {
        if (this.children.length > 0) {
            var childrenString = this.children.map(function (child) {
                return child.toString();
            }).reduce(function (prev, curr) {
                return prev + "\n" + curr;
            });
            childrenString = this.addIndentation(childrenString, 2);
            return this.code + " {\n" + childrenString + "\n}";
        }
        return this.code;
    };
    Code.prototype.addIndentation = function (str, numSpaces) {
        var spaces = "";
        for (var i = 0; i < numSpaces; i++) {
            spaces += " ";
        }
        str = spaces + str;
        str = str.replace(/\n/g, "\n" + spaces);
        return str;
    };
    return Code;
}();
exports.Code = Code;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = __webpack_require__(1);
var ApiMethod_1 = __webpack_require__(12);
var GeneratorHelpers = function () {
    function GeneratorHelpers() {}
    GeneratorHelpers.getApiControllers = function (emptyApiControllers, apiMethods) {
        for (var _i = 0, emptyApiControllers_1 = emptyApiControllers; _i < emptyApiControllers_1.length; _i++) {
            var emptyApiController = emptyApiControllers_1[_i];
            for (var _a = 0, apiMethods_1 = apiMethods; _a < apiMethods_1.length; _a++) {
                var apiMethod = apiMethods_1[_a];
                for (var _b = 0, _c = apiMethod.classNames; _b < _c.length; _b++) {
                    var className = _c[_b];
                    if (emptyApiController.name === className) {
                        emptyApiController.methods.push(apiMethod);
                        break; // need to add this method only once
                    }
                }
            }
        }
        return emptyApiControllers; // this is not empty anymore
    };
    GeneratorHelpers.getEmptyApiControllers = function (paths) {
        var controllers = [];
        var classNames = [];
        for (var url in paths) {
            for (var httpMethod in paths[url]) {
                paths[url][httpMethod].tags.map(function (className) {
                    if (classNames.indexOf(className) === -1) {
                        controllers.push({
                            name: className,
                            methods: []
                        });
                        classNames.push(className);
                    }
                });
            }
        }
        return controllers;
    };
    GeneratorHelpers.getApiMethods = function (paths) {
        var methods = [];
        for (var url in paths) {
            for (var httpMethod in paths[url]) {
                var method = new ApiMethod_1.ApiMethod();
                method.name = paths[url][httpMethod].operationId;
                method.classNames = paths[url][httpMethod].tags;
                var responses = paths[url][httpMethod].responses;
                if (responses["200"]) {
                    var returnTypeRef = responses["200"]["schema"]["$ref"];
                    method.returnType = returnTypeRef.substr(returnTypeRef.lastIndexOf("/") + 1);
                }
                method.httpMethod = this.cleanHttpMethod(httpMethod);
                method.allParams = paths[url][httpMethod].parameters;
                for (var _i = 0, _a = paths[url][httpMethod].parameters; _i < _a.length; _i++) {
                    var parameter = _a[_i];
                    if (parameter.schema && parameter.schema["$ref"]) {
                        var ref = parameter.schema["$ref"];
                        parameter.schema = ref.substr(ref.lastIndexOf("/") + 1);
                    }
                    switch (parameter.in.toUpperCase()) {
                        case "PATH":
                            method.pathParams.push(parameter);
                            break;
                        case "BODY":
                            method.bodyParams.push(parameter);
                            break;
                        case "QUERY":
                            method.queryParams.push(parameter);
                            break;
                        case "HEADER":
                            method.headerParams.push(parameter);
                            break;
                        default:
                            throw "Unknown param type -> " + parameter.in.toUpperCase();
                    }
                }
                method.url = url;
                methods.push(method);
            }
        }
        return methods;
    };
    GeneratorHelpers.cleanHttpMethod = function (httpMethod) {
        switch (httpMethod.toUpperCase()) {
            case "GET":
                return interfaces_1.HttpMethod.GET;
            case "POST":
                return interfaces_1.HttpMethod.POST;
            case "PUT":
                return interfaces_1.HttpMethod.PUT;
            case "PATCH":
                return interfaces_1.HttpMethod.PATCH;
            case "DELETE":
                return interfaces_1.HttpMethod.DELETE;
            default:
                throw "Unknown httpMethod -> " + httpMethod.toUpperCase();
        }
    };
    return GeneratorHelpers;
}();
exports.GeneratorHelpers = GeneratorHelpers;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var InterfaceGenerator = function () {
    // todo: cleanup code, add description docs
    function InterfaceGenerator(data, prefixInterfaces) {
        if (prefixInterfaces === void 0) {
            prefixInterfaces = 'I';
        }
        this.prefixInterfaces = prefixInterfaces;
        this.definitions = data.definitions;
    }
    InterfaceGenerator.prototype.generate = function () {
        var _this = this;
        return Object.keys(this.definitions).map(function (interfaceName) {
            return _this.generateInterfaceDefinition(interfaceName, _this.definitions[interfaceName], _this.prefixInterfaces) + "\n";
        }).join("\n\n");
    };
    InterfaceGenerator.prototype.generateInterfaceDefinition = function (interfaceName, definition, prefixInterface) {
        if (prefixInterface === void 0) {
            prefixInterface = 'I';
        }
        interfaceName = prefixInterface + InterfaceGenerator.toPascalCase(interfaceName);
        var interfaceDefinition = InterfaceGenerator.getInterfaceStub();
        var docBlock = definition.description ? InterfaceGenerator.getDocBlock(definition.description) : '';
        return interfaceDefinition.replace("{NAME}", interfaceName).replace("{DESCRIPTION}", docBlock).replace("{BODY}", this.getTypeDefinition(definition));
    };
    InterfaceGenerator.prototype.getTypeDefinition = function (definition) {
        var _this = this;
        var typeBody = [];
        // type is always object
        Object.keys(definition.properties).forEach(function (key) {
            var required = definition.required && definition.required.indexOf(key) !== -1 ? '' : '?';
            var doc = definition.properties[key].description ? InterfaceGenerator.getDocBlock(definition.properties[key].description) : undefined;
            typeBody = doc ? typeBody.concat(doc) : typeBody;
            if (definition.properties[key].type === 'array') {
                typeBody = typeBody.concat(key + required + ": " + _this.prefixInterfaces + InterfaceGenerator.getInterfaceFromReference(definition.properties[key].items["$ref"]) + "[]" + ",");
            } else if (definition.properties[key]["$ref"]) {
                typeBody = typeBody.concat(key + required + ": " + _this.prefixInterfaces + InterfaceGenerator.getInterfaceFromReference(definition.properties[key]["$ref"]) + ",");
            } else {
                typeBody = typeBody.concat(key + required + ": " + InterfaceGenerator.transformTypes(definition.properties[key].type !== "object" ? definition.properties[key].type : "any") + ",");
            }
        });
        return typeBody.join("\n\n");
    };
    InterfaceGenerator.getInterfaceFromReference = function (ref) {
        var parts = ref.split("/");
        return InterfaceGenerator.toPascalCase(parts[parts.length - 1]);
    };
    InterfaceGenerator.transformTypes = function (type) {
        switch (type) {
            case 'object':
                return 'any';
            case 'integer':
                return 'number';
            default:
                return type;
        }
    };
    InterfaceGenerator.toPascalCase = function (s) {
        return s.charAt(0).toUpperCase() + s.slice(1).replace(/(\_\w)/g, function (m) {
            return m[1].toUpperCase();
        });
    };
    // dirty methods start
    InterfaceGenerator.getInterfaceStub = function () {
        return "{DESCRIPTION} \nexport interface {NAME} {\n{BODY}\n}";
    };
    InterfaceGenerator.getDocBlock = function (description) {
        return "/**\n" + description + "\n*/";
    };
    return InterfaceGenerator;
}();
exports.InterfaceGenerator = InterfaceGenerator;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = __webpack_require__(1);
var Code_1 = __webpack_require__(7);
var TsControllerGenerator = function () {
    function TsControllerGenerator(apiControllers) {
        this.prefix = "I";
        this.apiControllers = apiControllers;
    }
    TsControllerGenerator.prototype.generate = function () {};
    TsControllerGenerator.prototype.generateString = function () {
        var codeString = "";
        var codes = this.generateApiControllerNodes();
        for (var _i = 0, codes_1 = codes; _i < codes_1.length; _i++) {
            var code = codes_1[_i];
            codeString += code.toString() + "\n";
        }
        return codeString + this.generateControllerService();
    };
    TsControllerGenerator.prototype.generateControllerService = function () {
        var shopServiceStub = TsControllerGenerator.getServiceStub();
        var serviceMethodStub = TsControllerGenerator.getServiceMethodStub();
        return shopServiceStub.replace("{DEFINITION}", this.apiControllers.map(function (api) {
            // replace doesn't replace all occurrence, so use regular expression (since this is not on production, we don't need to worry about performance)
            return serviceMethodStub.replace("{CONTROLLER}", api.name).replace(new RegExp("{CONTROLLER_NODE}", "g"), api.name.toPascalCase() + "Node"); //api.name;
        }).join("\n"));
    };
    TsControllerGenerator.prototype.generateApiControllerNodes = function () {
        var controllerCodes = [];
        for (var _i = 0, _a = this.apiControllers; _i < _a.length; _i++) {
            var apiController = _a[_i];
            var controllerCode = new Code_1.Code("export class " + apiController.name.toPascalCase() + "Node extends Service");
            for (var _b = 0, _c = apiController.methods; _b < _c.length; _b++) {
                var apiMethod = _c[_b];
                controllerCode.addChild(this.generateApiMethodCode(apiMethod));
            }
            controllerCodes.push(controllerCode);
        }
        return controllerCodes;
    };
    TsControllerGenerator.prototype.generateApiMethodCode = function (apiMethod) {
        var paramsAndOptions = "";
        if (apiMethod.allParams.length) {
            var paramsDef = TsControllerGenerator.getParamsDefinition(apiMethod.allParams);
            paramsAndOptions = "params: " + paramsDef + ", options?: IFetchRequest";
        } else {
            paramsAndOptions = "options?: IFetchRequest";
        }
        var returnType = apiMethod.returnType ? "Promise<" + this.prefix + apiMethod.returnType.toPascalCase() + ">" : "void";
        var parent = new Code_1.Code("public " + apiMethod.name.toCamelCase() + "(" + paramsAndOptions + "): " + returnType);
        var fetchRequestString = "return this.client.process({..." + this.getFetchRequestString(apiMethod) + ", ...options} as IFetchRequest);";
        var child = new Code_1.Code(fetchRequestString);
        parent.addChild(child);
        return parent;
    };
    TsControllerGenerator.getParamsDefinition = function (params, interfacePrefix) {
        if (interfacePrefix === void 0) {
            interfacePrefix = "I";
        }
        var paramsDef = "{";
        for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
            var param = params_1[_i];
            if (param.type === "integer") param.type = "number";
            paramsDef += " " + param.name.toCamelCase() + ": " + (param.type || interfacePrefix + param.schema.toPascalCase()) + ";";
        }
        paramsDef += " }";
        return paramsDef;
    };
    TsControllerGenerator.prototype.getFetchRequestString = function (apiMethod) {
        var fetchRequest = {};
        if (apiMethod.url && apiMethod.url.length) {
            fetchRequest.url = "`" + apiMethod.url + "`";
        }
        if (apiMethod.url && apiMethod.url.length && apiMethod.pathParams.length) {
            for (var _i = 0, _a = apiMethod.pathParams; _i < _a.length; _i++) {
                var pathParam = _a[_i];
                fetchRequest.url = fetchRequest.url.replace("{" + pathParam.name + "}", "${params." + pathParam.name.toCamelCase() + "}");
            }
        }
        if (apiMethod.queryParams.length) {
            fetchRequest.queryParameters = {};
            for (var _b = 0, _c = apiMethod.queryParams; _b < _c.length; _b++) {
                var queryParam = _c[_b];
                fetchRequest.queryParameters[queryParam.name] = "params." + queryParam.name.toCamelCase();
            }
        }
        if (apiMethod.bodyParams.length) {
            var bodyStr = "{";
            for (var _d = 0, _e = apiMethod.bodyParams; _d < _e.length; _d++) {
                var bodyParam = _e[_d];
                bodyStr += " ...params." + bodyParam.name.toCamelCase() + ",";
            }
            bodyStr = bodyStr.substr(0, bodyStr.length - 1);
            bodyStr += "}";
            fetchRequest.body = "JSON.stringify(" + bodyStr + ")";
        }
        if (apiMethod.headerParams.length) {
            fetchRequest.headers = {};
            for (var _f = 0, _g = apiMethod.headerParams; _f < _g.length; _f++) {
                var headerParam = _g[_f];
                fetchRequest.headers[headerParam.name] = "params." + headerParam.name.toCamelCase();
            }
        }
        if (apiMethod.httpMethod) {
            fetchRequest.method = "\"" + interfaces_1.HttpMethod[apiMethod.httpMethod] + "\"";
        }
        return this.convertFetchRequestToString(fetchRequest);
    };
    TsControllerGenerator.prototype.convertFetchRequestToString = function (fetchRequest, addQuoteAroundKey) {
        if (addQuoteAroundKey === void 0) {
            addQuoteAroundKey = false;
        }
        var result = "{";
        for (var key in fetchRequest) {
            var value = fetchRequest[key];
            if (typeof value === "object") {
                var subValue = this.convertFetchRequestToString(value, key === "headers");
                result += addQuoteAroundKey ? " \"" + key + "\": " + subValue + "," : " " + key + ": " + subValue + ",";
            } else {
                result += addQuoteAroundKey ? " \"" + key + "\": " + value + "," : " " + key + ": " + value + ",";
            }
        }
        result = result.substr(0, result.length - 1);
        result += " }";
        return result;
    };
    // dirty methods start
    TsControllerGenerator.getServiceMethodStub = function () {
        return 'get {CONTROLLER}(): {CONTROLLER_NODE} {\n  return new {CONTROLLER_NODE}(this.client);\n}\n';
    };
    TsControllerGenerator.getServiceStub = function () {
        return 'export class ShopService extends Service {\n{DEFINITION}\n}\n';
    };
    return TsControllerGenerator;
}();
exports.TsControllerGenerator = TsControllerGenerator;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(3);
var TypeScriptGenerator_1 = __webpack_require__(4);
var program = __webpack_require__(5);
program.version('0.0.1').option("-l, --lang [type]", "Language").option("-s, --spec [path]", "Spec file path").parse(process.argv);
if (program.lang === "typescript") {
    new TypeScriptGenerator_1.TypeScriptGenerator(program.spec ? "./" + program.spec : "./spec.json").generate();
} else {
    console.log("Sorry! right now we only support typescript!");
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var ApiMethod = function () {
    function ApiMethod() {
        this.name = null;
        this.classNames = [];
        this.returnType = null;
        this.httpMethod = null;
        this.allParams = [];
        this.pathParams = [];
        this.queryParams = [];
        this.bodyParams = [];
        this.headerParams = [];
        this.url = null;
    }
    return ApiMethod;
}();
exports.ApiMethod = ApiMethod;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(0)
  , lstat = fs.lstatSync;

exports.readlinkSync = function (p) {
  if (lstat(p).isSymbolicLink()) {
    return fs.readlinkSync(p);
  } else {
    return p;
  }
};




/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map