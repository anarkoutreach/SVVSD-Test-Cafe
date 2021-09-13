import os
import xlsxwriter
failsym = "ù"
succsesssym = "Ü"
# Create a workbook and add a worksheet.

def fix(passed,fail):
    for i in range(100):
        for x in range(100):
            passed.write(i,x," ")
            fail.write(i,x," ")
            x+=1
        i+=1
def getNamesFromFile(path):  
    names = []
    with open(path, "r") as file:
        text = file.read()
        arr = text.split("test(")
        arr[0]=""
        for item in arr:
            itemArr = item.split(",")
            names.append(itemArr[0])
    return names

def getNamesOfTestsInFolder(folder):
    cwd = os.getcwd()
    arr = os.listdir(folder)
    print(arr)
    allNames = []
    for item in arr:
        if(os.path.isfile(cwd+ "/Tests/"+item)):
            print("test")
            allNames.append({'name':item,'data':getNamesFromFile(cwd+ "/Tests/"+item)})
    return allNames

def spreadFromFiles():
    workbook = xlsxwriter.Workbook('tests.xlsx')
    names = getNamesOfTestsInFolder("./Tests/")
    for item in names:
        row = 0
        col = 0
        worksheet = workbook.add_worksheet(item["name"])
        for name in item["data"]:
            worksheet.write(row,col,name)
            row+=1
        
        
    workbook.close()
def spreadFromLog():
    workbook = xlsxwriter.Workbook('tests.xlsx')
    passed = workbook.add_worksheet()
    fail = workbook.add_worksheet()
    fails = []
    success = []
    with open("./tests.log", "r") as file:
        text = file.read()
        errorSplit = text.split(failsym)
        sSplit = text.split(succsesssym)
        del errorSplit[0]
        del sSplit[0]
        #print(errorSplit[2])
        for item in errorSplit:
            itemArr = item.split(succsesssym)
            fails.append(itemArr[0])
        for item in sSplit:
            itemArr = item.split(failsym)
            itemArr2 = itemArr[0].split("[DEPRECATED]")
            success.append(itemArr2[0])
    row = 0
    col = 0
   
    
    
    for item in success:
        passed.write(row,col,item)
        row+=1
    
    row = 0

    
    for item in fails:
        arr = item.split("1)",1)
        fail.write(row,col,arr[0])
        if(len(arr) > 1):
            fail.write(row,col+1,arr[1])
        
       
        
        row+=1
    
    workbook.close()
    
    
spreadFromLog()