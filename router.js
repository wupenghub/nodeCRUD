var express = require('express');
var router = express.Router();
var fs = require('fs');
router.get('/', function (req, res) {
    fs.readFile('./db.json', 'utf8', function (err, content) {
        if (err) {
            return res.end('服务器响应失败');
        }
        res.render('index.html', {pList: JSON.parse(content)});
    });

});

router.get('/students/new', function (req, res) {
    res.render('addPerson.html')
});
router.post('/students/new', function (req, res) {
    fs.readFile('./db.json', 'utf8', function (err, content) {
        if (err) {
            return res.end('服务器响应失败');
        }
        var list = JSON.parse(content);
        var stu = req.body;
        stu.id = list.length + 1;
        list.push(stu);
        var studentStr = JSON.stringify(list);
        fs.writeFile('./db.json', studentStr, function (err) {
            if (err) {
                return res.end('服务器响应失败');
            }
            res.redirect('/');
        })
    });


});
router.get('/students/edit', function (req, res) {
    var id = req.query;
    fs.readFile('./db.json', 'utf8', function (err, content) {
        if (err) {
            return res.end('服务器响应失败');
        }
        var index = 0;
        var list = JSON.parse(content);
        list.some(function (item) {
            if (item.id == parseInt(id.id)) {
                return true;
            }
            index++;
        });
        res.render('editStudent.html', {
            student: list[index]
        });
    });

});
router.post('/students/edit', function (req, res) {
    fs.readFile('./db.json', 'utf8', function (err, content) {
        if (err) {
            return res.end('服务器响应失败');
        }
        var list = JSON.parse(content);
        var student = req.body;
        var index = 0;
        list.some(function (item) {
            if (student.id == item.id) {
                return true;
            }
            index++;
        });
        list[index].name = student.name;
        list[index].age = student.age;
        list[index].gender = student.gender;
        list[index].hobbies = student.hobbies;
        var studentStr = JSON.stringify(list);
        fs.writeFile('./db.json', studentStr, function (err) {
            if (err) {
                return res.end('服务器响应失败');
            }
            res.redirect('/');
        })
    });

});
router.get('/students/delete', function (req, res) {
    fs.readFile('./db.json', 'utf8', function (err, content) {
        var id = req.query;
        if (err) {
            return res.end('服务器响应失败');
        }
        var list = JSON.parse(content);
        var index = 0;
        list.some(function (item) {
            if (id.id == item.id) {
                return true;
            }
            index++;
        });
        list.splice(index, 1);
        var studentStr = JSON.stringify(list);
        fs.writeFile('./db.json', studentStr, function (err) {
            if (err) {
                return res.end('服务器响应失败');
            }
            res.redirect('/');
        })
    });
});
module.exports = router;