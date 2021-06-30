import os
import xlsxwriter

# Create a workbook and add a worksheet.


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
    fails = []
    success = []
    with open("./tests.log", "r") as file:
        text = file.read()
        errorSplit = text.split("Ã—")
        sSplit = text.split("âˆš")
        del errorSplit[0]
        del sSplit[0]
        #print(errorSplit[2])
        for item in errorSplit:
            itemArr = item.split("âˆš")
            fails.append(itemArr[0])
        for item in sSplit:
            itemArr = item.split("Ã—")
            itemArr2 = itemArr[0].split("[DEPRECATED]")
            success.append(itemArr2[0])
    row = 0
    col = 0
    passed = workbook.add_worksheet("passed")
    for item in success:
        passed.write(row,col,item)
        row+=1
    fail = workbook.add_worksheet("failed")
    row = 0
    fail.set_column(col,col,20)
    cell_format = workbook.add_format()
    cell_format.set_text_wrap()
    for item in fails:
        
        arr = item.split("1)",1)
        fail.write(row,col,arr[0],cell_format)
        fail.write(row,col+1,arr[1],cell_format)
        lenth = len(arr[1])

        fail.set_column(col+1,col+1,100)
        fail.set_row(row,lenth/2)
        row+=1
    
    workbook.close()
spreadFromLog()