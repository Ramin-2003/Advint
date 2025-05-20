import json
import uuid
import time
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('demo-registry')

def handler(event, context):
    path_params = event.get('pathParameters') or {}
    url_param = path_params.get('url')

    if not url_param:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Missing URL path parameter'})
        }

    method = event['requestContext']['http']['method']

    if method == 'PUT':
        item = {
            'URL': url_param,
            'imageUrl': f'https://images.example.com/{uuid.uuid4()}.png',
            'CreatedAt': int(time.time()),
            'AccessIP': event['requestContext']['http'].get('sourceIp', 'unknown')
        }
        table.put_item(Item=item)
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Item stored', 'item': item})
        }

    elif method == 'GET':
        resp = table.get_item(Key={'URL': url_param})
        item = resp.get('Item')
        if not item:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'Item not found'})
            }
        return {
            'statusCode': 200,
            'body': json.dumps(item)
        }

    else:
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Method not allowed'})
        }