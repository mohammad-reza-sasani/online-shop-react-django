

# data={
#         "full_name":['',100],        
#         "phone_number":["09308277488",20],            
#     }

# def validator_data_pro (data):
#     print(data)
#     for name_item,value_item in data.items():                
#             if data[name_item][0]:
#                 if len(data[name_item][0]) < int(data[name_item][1]):
#                     pass           
#                 else :
#                     return {"error":f"length-error for {name_item}"}
#             else :        
#                 return {"error":f"empty-error for {name_item}"}
#     return True 

# print(validator_data_pro(data))



from datetime import date, datetime, timedelta


print(datetime.now())